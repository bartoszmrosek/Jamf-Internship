import { Product } from "src/app/interfaces/product.interface";
import { INITIAL_PRODUCTS, ProductsService } from "./products.service"

describe("ProductsService", ()=>{
    let service: ProductsService;
    beforeEach(()=>{
        service = new ProductsService();
    })

    it("#openAddingForm should change _isAdding stream", async ()=>{
        let testVal: null | boolean = null;
        service._isAdding$.subscribe(val=>{testVal = val});
        service.openAddingForm();
        expect(testVal).toBe(true);
    })
    it("#stopAddingForm should change _IsAdding stream", ()=>{
        let testVal: null | boolean = null;
        service._isAdding$.subscribe(val=>{testVal = val});
        service.stopAddingForm();
        expect(testVal).toBe(false);
    })
    it("#addProduct should return new product list", ()=>{
        let testingList: Product[] | null = null;
        const newProduct = {name: "test", price: 1, imageUrl: ""}
        service._productList$.subscribe(val=>{testingList=val})
        service.addProduct(newProduct);
        expect(testingList).toStrictEqual([...INITIAL_PRODUCTS, newProduct])
    })
})