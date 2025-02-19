import { useState, useRef } from 'react';
import { colors, sizes } from '../../../data';
import { createImage, createProduct } from '../../../data/api';
import SpinnerLoadingUi from '../../ui/SpinnerLoadingUi';
import Swal from 'sweetalert2'



const CreateProducts = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const inputFile = useRef(null)
  const MAX_SIZE = 15000000
  const [forms, setForms] = useState({
    productName: "",
    price: "",
    description: "",
    sizes: [],
    colors: [],
    imageId: "",
    discount: ""
  });
  const [isLoading, setIsLoading] = useState(false)


  //Handle input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileExtension = file.name.substring(file.name.lastIndexOf("."))

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }

    if(fileExtension != ".jpg" && fileExtension != ".jpeg" && fileExtension != ".png") {
      alert("File must be jpg, jpeg, or png!")
      inputFile.current.value = ""
      inputFile.current.type = "file"
      return
    }

    if(file.size > MAX_SIZE) {
      alert("File size exceeds the limit (15 Mb)!")
      inputFile.current.value = ""
      inputFile.current.type = "file"
      return
    }
    setForms({
      ...forms,
      imageId: file
    })
  };

  
  const handleInputChange = (e) => {
    setForms({
      ...forms,
      [e.target.name]: e.target.name === 'price' || e.target.name === 'discount' 
        ? Number(e.target.value)
        : e.target.value
    })
  }

  const handleCheckChange = (e) => {
    const { name, value, checked } = e.target
    setForms(prev => ({
      ...prev,
      [name]: checked 
        ? [...prev[name], value] 
        : prev[name].filter(item => item !== value)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const file = forms.imageId
      if(!file) {
        throw new Error("Select the image!")
      }

      const imageRes = await createImage(file)
      if(!imageRes.data?.key) {
        throw new Error("Gagal upload gambar")
      }

      const productData = {
        productName: forms.productName,
        price: Number(forms.price),
        description: forms.description,
        sizes: forms.sizes,
        colors: forms.colors,
        discount: Number(forms.discount) || 0,
        imageId: imageRes.data.key 
      };

      const result = await createProduct(productData)
      if(result) {
        setForms({
          productName: "",
          price: "",
          description: "",
          sizes: [],
          colors: [],
          imageId: "",
          discount: ""
        })
        setPreviewImage(null)

        if(inputFile.current) {
          inputFile.current.value = ""
        }
      }
      setIsLoading(false)
      Swal.fire({
        title: "Product successfully added!",
        icon: "success",
        draggable: true,
        confirmButtonColor: '#460203',
      })
    } catch (err) {
      console.error("Error:", err)
      alert(err.message)
    }
  }

  console.log(forms)
  

  return (
    <main className="md:mt-10">
      <div className={`${isLoading ? '' : 'hidden'} transition-all ease-in-out duration-300 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-screen bg-primary/10 w-screen z-20`}>
        <div className='flex items-center justify-center h-screen'>
          <SpinnerLoadingUi />
        </div>
      </div>
      <div className="h-fit md:w-1/2 md:border p-10 rounded-xl mx-auto px-[15px] md:px-8">
        <form className="flex flex-col font-satoshi text-primary" onSubmit={handleSubmit} >
          <label className="font-bold text-lg">Product Image</label>
          <div className="relative border-2 border-dashed w-fit border-primary rounded-xl mb-5 h-48 flex items-center justify-center hover:bg-primary/10 py-2 px-4 mx-auto">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              name="file"
              ref={inputFile}
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
          <input
            name="productName"
            type="text"
            className="w-full p-2 px-4 border-primary border rounded-xl text-primary mb-5"
            placeholder="Input product name"
            required
            onChange={handleInputChange}
            value={forms.productName}
          />
          <label className="font-bold text-lg">Product Price</label>
          <input 
            name="price"
            type="number"
            className="w-full p-2 px-4 border-primary border rounded-xl text-primary mb-5"
            placeholder="Set the price in $"
            required
            onChange={handleInputChange}
            value={forms.price}
          />
          <label className="font-bold text-lg">Description</label>
          <textarea
            name="description"
            type="text"
            className="w-full h-fit p-2 px-4 border-primary border rounded-xl  text-primary mb-5"
            placeholder="Add a description of the product"
            required
            onChange={handleInputChange}
            value={forms.description}
          />
          
          <label className="font-bold text-lg">Product Colors</label>
          <div className="flex justify-between border p-4 rounded-xl mb-5">
            {colors.map((color) => (
              <div key={color.value} className="flex gap-1">
                <input
                  name="colors"
                  type="checkbox"
                  value={color.name}
                  className="w-5"
                  onChange={handleCheckChange}
                  checked={forms.colors.includes(color.name)}
                  />
                <div className={`w-6 h-6 border rounded-full ${color.color}`}/>
              </div>
            ))}
          </div>

          <label className="font-bold text-lg">Product Sizes</label>
          <div className="flex flex-wrap border p-4 rounded-xl mb-5 gap-4">
            {sizes.map((size) => (
              <div key={size.id} className="flex gap-1">
                <input
                  name="sizes"
                  type="checkbox"
                  value={size.size}
                  className="w-5"
                  onChange={handleCheckChange}
                  checked={forms.sizes.includes(size.size)}
                  />
                <label>{size.size}</label>
              </div>
            ))}
          </div>

          <label className="font-bold text-lg">Product Discount</label>
          <input
            name="discount"
            type="number"
            className="w-full p-2 px-4 border-primary border rounded-xl text-primary mb-5"
            placeholder="Give discount in %"
            onChange={handleInputChange}
            value={forms.discount}
          />

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