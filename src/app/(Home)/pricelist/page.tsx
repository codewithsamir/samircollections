import React from 'react';

export default function PriceList() {
  return (
    <div className="min-h-screen py-5 bg-red-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Price List</h1>

        <div className="space-y-8">
          {/* Jacket Services */}
          <div>
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Jacket Services</h2>
            <table className="w-full text-left text-gray-700">
              <tbody>
                <tr>
                  <td>Runner Change</td>
                  <td>Rs. 40 to Rs. 50</td>
                </tr>
                <tr>
                  <td>Whole Zipper Change</td>
                  <td>Depends on Size</td>
                </tr>
                <tr>
                  <td>Fitting</td>
                  <td>Depends on Size and Fit</td>
                </tr>
                <tr>
                  <td>Sticker Stitching</td>
                  <td>Depends on Effort and Sticker price</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Jeans Services */}
          <div>
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Jeans Services</h2>
            <table className="w-full text-left text-gray-700">
              <tbody>
                <tr>
                  <td>Whole Fitting</td>
                  <td>Rs. 300</td>
                </tr>
                <tr>
                  <td>Side Fitting</td>
                  <td>Rs. 100</td>
                </tr>
                <tr>
                  <td>Height Fitting (Shortening)</td>
                  <td>Rs. 50 to Rs. 100 (Depends on Style)</td>
                </tr>
                <tr>
                  <td>Kamar (Waist) Fitting</td>
                  <td>Rs. 100 to Rs. 150</td>
                </tr>
                <tr>
                  <td>Zipper Change</td>
                  <td>Rs. 100</td>
                </tr>
                <tr>
                  <td>Runner Change</td>
                  <td>Rs. 50</td>
                </tr>
                <tr>
                  <td>Scratch or Cut Repairs</td>
                  <td>Depends on Effort and Area</td>
                </tr>
                <tr>
                  <td>Tear Repairs</td>
                  <td>Depends on Size and Complexity</td>
                </tr>
                <tr>
                  <td>Pocket Change</td>
                  <td>Rs. 50 to Rs. 100 (Depends on Style)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Paints and Track Paints */}
          <div>
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Paints & Track Paints</h2>
            <table className="w-full text-left text-gray-700">
              <tbody>
                <tr>
                  <td>Paint Zipper or Chain Change</td>
                  <td>Rs. 80</td>
                </tr>
                <tr>
                  <td>Only Runner Change</td>
                  <td>Rs. 50</td>
                </tr>
                <tr>
                  <td>Elastic Change (1-inch)</td>
                  <td>Rs. 100</td>
                </tr>
                <tr>
                  <td>Elastic Change (2-inch)</td>
                  <td>Rs. 150</td>
                </tr>
                <tr>
                  <td>Track Paint Elastic Change (1-inch)</td>
                  <td>Rs. 100</td>
                </tr>
                <tr>
                  <td>Track Paint Elastic Change (2-inch)</td>
                  <td>Rs. 150</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bag Services */}
          <div>
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Bag Services</h2>
            <table className="w-full text-left text-gray-700">
              <tbody>
                <tr>
                  <td>Bag Zipper Change</td>
                  <td>Rs. 40 to Rs. 100</td>
                </tr>
                <tr>
                  <td>Whole Zipper Change</td>
                  <td>Depends on Size</td>
                </tr>
                <tr>
                  <td>Trolley Bag Runner Change</td>
                  <td>Depends on Size and Quality</td>
                </tr>
                <tr>
                  <td>Ladies Bag Repairs</td>
                  <td>Depends on Size and Quality</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Add other services similarly */}
        </div>

   
      </div>
    </div>
  );
}
