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
}));
