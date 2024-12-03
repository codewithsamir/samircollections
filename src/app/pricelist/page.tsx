import React from 'react';

export default function PriceList() {
  return (
    <div className="min-h-screen py-5 bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Price List</h1>

        <div className="space-y-6">
          {/* Jacket Services */}
          <div>
            <h2 className="text-2xl font-medium text-gray-700">Jacket Services</h2>
            <ul className="list-disc pl-6">
              <li>Runner Change: Rs. 40 to Rs. 50</li>
              <li>Whole Zipper Change: Depends on Size</li>
              <li>Fitting: Depends on Size and Fit</li>
              <li>Sticker Stitching: Depends on Effort</li>
            </ul>
          </div>

          {/* Jeans Services */}
          <div>
            <h2 className="text-2xl font-medium text-gray-700">Jeans Services</h2>
            <ul className="list-disc pl-6">
              <li>Whole Fitting: Rs. 300</li>
              <li>Side Fitting: Rs. 100</li>
              <li>Height Fitting (Shortening): Rs. 50 to Rs. 100 (Depends on Style)</li>
              <li>Kamar (Waist) Fitting: Rs. 100 to Rs. 150</li>
              <li>Zipper Change: Rs. 100</li>
              <li>Runner Change: Rs. 50</li>
              <li>Scratch or Cut Repairs: Depends on Effort and Area</li>
              <li>Tear Repairs: Depends on Size and Complexity</li>
              <li>Pocket Change: Rs. 50 to Rs. 100 (Depends on Style)</li>
            </ul>
          </div>

          {/* Paints and Track Paints */}
          <div>
            <h2 className="text-2xl font-medium text-gray-700">Paints & Track Paints</h2>
            <ul className="list-disc pl-6">
              <li>Paint Zipper or Chain Change: Rs. 80</li>
              <li>Only Runner Change: Rs. 50</li>
              <li>Elastic Change (1-inch): Rs. 100</li>
              <li>Elastic Change (2-inch): Rs. 150</li>
              <li>Track Paint Elastic Change (1-inch): Rs. 100</li>
              <li>Track Paint Elastic Change (2-inch): Rs. 150</li>
            </ul>
          </div>

          {/* Bags */}
          <div>
            <h2 className="text-2xl font-medium text-gray-700">Bag Services</h2>
            <ul className="list-disc pl-6">
              <li>Bag Zipper Change: Rs. 40 to Rs. 100</li>
              <li>Whole Zipper Change: Depends on Size</li>
              <li>Trolley Bag Runner Change: Depends on Size and Quality</li>
              <li>Ladies Bag Repairs: Depends on Size and Quality</li>
            </ul>
          </div>

          {/* Shirt Services */}
          <div>
            <h2 className="text-2xl font-medium text-gray-700">Shirt Services</h2>
            <ul className="list-disc pl-6">
              <li>Full Fitting: Rs. 150</li>
              <li>Only Body Fitting: Rs. 80 to Rs. 150 (Depends on Size)</li>
            </ul>
          </div>

          {/* General Repairs */}
          <div>
            <h2 className="text-2xl font-medium text-gray-700">General Repairs</h2>
            <ul className="list-disc pl-6">
              <li>Small and Big Part Cloth Repairs: Depends on Effort</li>
              <li>Height Adjustment (Shortening): Rs. 50 to Rs. 100 (Depends on Style)</li>
            </ul>
          </div>

          {/* Miscellaneous */}
          <div>
            <h2 className="text-2xl font-medium text-gray-700">Miscellaneous</h2>
            <ul className="list-disc pl-6">
              <li>Belt Buckle Change: Rs. 200</li>
              <li>Extra Repairs: Depends on Specific Requirements</li>
            </ul>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-500 text-center">Note: A service charge of Rs. 50 applies if your location is more than 10 minutes away.</p>
      </div>
    </div>
  );
}
