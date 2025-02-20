export const filterList = [
  { 
      id: 1,
      name: 'T-shirt' 
  },
  { 
      id: 2,
      name: 'Short' 
  },
  { 
      id: 3,
      name: 'Shirt' 
  },
  { 
      id: 4,
      name: 'Hoodie' 
  },
  { 
      id: 5,
      name: 'Jeans' 
  }
];


export const colors = [
  { 
      value: 1, 
      color: 'bg-green-500',
      name: 'Green' 
  },  
  { 
      value: 2, 
      color: 'bg-red-500',
      name: 'Red' 
  },     
  { 
      value: 3, 
      color: 'bg-yellow-400',
      name: 'Yellow' 
  },  
  { 
      value: 4, 
      color: 'bg-orange-500',
      name: 'Orange' 
  },  
  { 
      value: 5, 
      color: 'bg-sky-400',
      name: 'Sky Blue' 
  },     
  { 
      value: 6, 
      color: 'bg-blue-600',
      name: 'Blue' 
  },    
  { 
      value: 7, 
      color: 'bg-purple-600',
      name: 'Purple' 
  }, 
  { 
      value: 8, 
      color: 'bg-pink-500',
      name: 'Pink' 
  },     
  { 
      value: 9, 
      color: 'bg-white',
      name: 'White' 
  },        
  { 
      value: 10, 
      color: 'bg-black',
      name: 'Black' 
  }        
];

export const sizes = [
  { 
      id: 1,
      size: "XX-Small" 
  },
  { 
      id: 2,
      size: "X-Small" 
  },
  { 
      id: 3,
      size: "Small" 
  },
  { 
      id: 4,
      size: "Medium" 
  },
  { 
      id: 5,
      size: "Large" 
  },
  { 
      id: 6,
      size: "X-Large" 
  },
  { 
      id: 7,
      size: "XX-Large" 
  },
  { 
      id: 8,
      size: "3X-Large" 
  },
  { 
      id: 9,
      size: "4X-Large" 
  }
];

export const dressStyles = [
  { 
      id: 1,
      name: "Casual" 
  },
  { 
      id: 2,
      name: "Formal" 
  },
  { 
      id: 3,
      name: "Party" 
  },
  { 
      id: 4,
      name: "Gym" 
  }
];

export const discountCal = (discount, price) => {
    if(discount === 0) {
        return price
    } else {
        return price = price - (price * (discount/100))
    }
}