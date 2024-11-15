import React from 'react';

export default function About() {
  return (
    <div className="bg-off-white text-gray-900">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-800 via-indigo-500 to-indigo-800 text-white py-16">
        <div className="container mx-auto text-center px-6 md:px-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            About <span className="text-cyan-200">ShopieeMart</span>
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            Learn more about our mission, vision, and the team behind ShopieeMart.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto">
            At ShopieeMart, our mission is to provide an online marketplace where both sellers and buyers can connect effortlessly. We aim to empower local businesses and provide customers with a seamless shopping experience by offering a wide range of high-quality products, easy navigation, and a user-friendly platform.
          </p>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-8">Meet the Team</h2>
          <div className="flex flex-wrap justify-center gap-6 md:flex-nowrap">

            {/* Tahmid Iqbal - Founder & Top Dog */}
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full md:w-1/4">
              <img src="src/assets/Tahmid.png" alt="Tahmid Iqbal" className="w-32 h-32 object-cover mx-auto mb-4 rounded-full" />
              <h3 className="text-xl font-semibold">Tahmid Iqbal</h3>
              <p className="text-gray-600">Founder & Top Dog</p>
              <p className="text-gray-600 mt-4">
                As the Founder & Top Dog, Tahmid leads with passion and vision, ensuring ShopieeMart stays ahead in the fast-paced world of eCommerce. His strategic thinking and drive inspire the team to push boundaries and innovate continuously.
              </p>
            </div>

            {/* M.A. Siddique Antor - CFO */}
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full md:w-1/4">
              <img src="src/assets/Antor.jpg" alt="M.A. Siddique Antor" className="w-32 h-32 object-cover mx-auto mb-4 rounded-full" />
              <h3 className="text-xl font-semibold">M.A. Siddique Antor</h3>
              <p className="text-gray-600">Chief Financial Officer (CFO)</p>
              <p className="text-gray-600 mt-4">
                As the CFO, Antor is responsible for managing the financial health of ShopieeMart, ensuring we remain financially sound as we continue to grow. His expertise in finance and strategic planning ensures the company’s success in the long run.
              </p>
            </div>

            {/* Rizwanul Islam - CEO */}
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full md:w-1/4">
              <img src="src/assets/Rizzo.jpg" alt="Rizwanul Islam" className="w-32 h-32 object-cover mx-auto mb-4 rounded-full" />
              <h3 className="text-xl font-semibold">Rizwanul Islam</h3>
              <p className="text-gray-600">Chief Executive Officer (CEO)</p>
              <p className="text-gray-600 mt-4">
                As the CEO, Rizwan leads ShopieeMart with a focus on growth, business strategy, and long-term vision. His leadership ensures the company's continued expansion while maintaining a strong, user-centered approach.
              </p>
            </div>

            {/* Tasnim Rahman - CMO */}
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full md:w-1/4">
              <img src="src/assets/Tasnim.jpg" alt="Tasnim Rahman" className="w-32 h-32 object-cover mx-auto mb-4 rounded-full" />
              <h3 className="text-xl font-semibold">Tasnim Rahman</h3>
              <p className="text-gray-600">Chief Marketing Officer (CMO)</p>
              <p className="text-gray-600 mt-4">
                As the CMO, Tasnim is in charge of promoting ShopieeMart's brand and ensuring that it reaches a wider audience. Her expertise in digital marketing helps drive traffic and engagement to the platform, making it a household name.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto text-center px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-8">Our Story</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto mb-6">
            Founded with a passion for eCommerce and helping small businesses thrive, ShopieeMart started as an idea among a group of students at BRAC University. With the belief that the marketplace of the future should be inclusive and easily accessible to everyone, we launched ShopieeMart to bring products from different niches to one unified platform.
          </p>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto">
            Today, we are proud to serve thousands of users, and our goal remains the same: to create a platform that makes buying and selling simple, secure, and enjoyable for everyone.
          </p>
        </div>
      </section>
    </div>
  );
}
