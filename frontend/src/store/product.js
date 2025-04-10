import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.image
    ) {
      return { success: false, message: "Please provide all the fields" };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();
    set((state) => ({
      products: [...state.products, data.data],
    }));
    return { success: true, message: "Product created successfully" };

    // return res.json().then((data) => {
    //   if (data.success) {
    //     set((state) => {
    //       return {
    //         products: [...state.products, data.product],
    //       };
    //     });
    //     return { success: true, message: "Product created successfully" };
    //   } else {
    //     return { success: false, message: data.message };
    //   }
    // });
  },

  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },

  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },

  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      products: state.products.map((product) => {
        if (product._id === pid) {
          return { ...product, ...updatedProduct };
        }
        return product;
      }),
    }));
    return { success: true, message: data.message };
  },

  // /**
  //  * Updates a product by its ID.
  //  * @param {string} pid - The product ID.
  //  * @param {Object} updatedProduct - The updated product data.
  //  * @returns {Object} The result of the update operation, indicating success and a message.
  //  */
  // updateProductByID: async (pid, updatedProduct) => {
  //   // Send a PUT request to update the product
  //   const res = await fetch(`/api/products/${pid}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedProduct),
  //   });

  //   // Parse the JSON response
  //   const data = await res.json();

  //   // Check if the update was successful
  //   if (!data.success) {
  //     // Return failure message
  //     return { success: false, message: data.message };
  //   } else {
  //     // Return success message
  //     return { success: true, message: data.message };
  //   }
  // },
}));
