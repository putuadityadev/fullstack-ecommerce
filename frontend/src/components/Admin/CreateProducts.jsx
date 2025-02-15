import { useState } from 'react';

const CreateProducts = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="md:mt-10">
      <div className="h-fit md:w-1/2 md:border p-10 rounded-xl mx-auto px-[15px] md:px-8">
        <form className="flex flex-col font-satoshi text-primary">
          <label className="font-bold text-lg">Product Image</label>
          <div className="relative border-2 border-dashed w-fit border-primary rounded-xl mb-5 h-48 flex items-center justify-center hover:bg-primary/10 py-2 px-4 mx-auto">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled = {!previewImage ? false : true}
            />
            {previewImage ? (
                <img 
                src={previewImage} 
                alt="Preview" 
                className="w-full h-full object-contain rounded-xl" 
              />
            ) : (
              <div className="text-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="w-12 h-12 mx-auto text-primary"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" 
                  />
                </svg>
                <p className="mt-2 text-sm text-primary">Click to upload image</p>
              </div>
            )}
          </div>
          <label className="font-bold text-lg">Product Name</label>
          <input type="text" className="w-full p-2 px-4 border-primary border rounded-xl  text-primary mb-5" placeholder="Input product name" />
          <label className="font-bold text-lg">Product Price</label>
          <input type="number" className="w-full p-2 px-4 border-primary border rounded-xl  text-primary mb-5" placeholder="Set the price" />
          <label className="font-bold text-lg">Description</label>
          <textarea type="text" className="w-full p-2 px-4 border-primary border rounded-xl  text-primary mb-5" placeholder="Add a description of the product"required />
          <label className="font-bold text-lg">Product Discount</label>
          <input type="number" className="w-full p-2 px-4 border-primary border rounded-xl  text-primary mb-5" placeholder="Give discount in %"/>
          <div className="flex gap-10 mt-5">
            <button className="p-4 text-primary border rounded-xl w-1/2">Cancel</button>
            <button className="p-4 text-white font-bold bg-primary rounded-xl w-1/2">Publish</button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default CreateProducts