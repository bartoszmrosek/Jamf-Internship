import { fireEvent, render, screen } from "@testing-library/angular"
import { AppComponent } from "./app.component"
import { ProductsService } from "./services/products/products.service"
import { ProductsModule } from "./layout/products/products.module"
import { NavbarComponent } from "./layout/navbar/navbar.component"

describe("AppComponent", ()=>{
    beforeEach(async ()=>{
        await render(AppComponent, {
            imports: [
                ProductsModule
            ],
            declarations: [
                NavbarComponent,
            ],
            providers: [ProductsService]
        })
    })

    it("should handle opening of form from navbar", ()=>{
        fireEvent.click(screen.getByTestId("nav-new-product"));
        expect(screen.getByTestId("adding-form")).toHaveAttribute("aria-hidden", "false");
    })
})