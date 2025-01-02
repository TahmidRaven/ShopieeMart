import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      window.location.href = data.redirect;
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="p-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-800 to-black">
      <div className="w-full max-w-lg bg-gray-800/60 backdrop-blur-md p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl text-center font-bold text-white mb-8">Profile</h1>
        <div className="flex justify-center mb-6">
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className="rounded-full h-28 w-28 object-cover cursor-pointer border-4 border-white hover:shadow-xl transition"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <p className="text-center">
            {fileUploadError ? (
              <span className="text-red-300">
                Error uploading image (must be less than 2MB)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-gray-300">{`Uploading ${filePerc}%...`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-300">Upload complete!</span>
            ) : (
              ''
            )}
          </p>
          <input
            type="text"
            placeholder="Username"
            defaultValue={currentUser.username}
            id="username"
            className="w-full border border-gray-700 bg-gray-700/40 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            defaultValue={currentUser.email}
            className="w-full border border-gray-700 bg-gray-700/40 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            id="password"
            className="w-full border border-gray-700 bg-gray-700/40 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
          />
          <button
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg text-lg font-semibold uppercase hover:bg-purple-700 transition disabled:opacity-80"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
        <div className="flex justify-between mt-6">
          <span
            onClick={handleDeleteUser}
            className="text-red-300 cursor-pointer hover:underline"
          >
            Delete Account
          </span>
          <span
            onClick={handleSignOut}
            className="text-red-300 cursor-pointer hover:underline"
          >
            Sign Out
          </span>
        </div>
        <p className="mt-4 text-red-300">{error && error}</p>
        <p className="mt-4 text-green-300">
          {updateSuccess && 'Profile updated successfully!'}
        </p>
      </div>
    </div>
  );
}
