import { fireEvent, render, screen, waitFor } from "@testing-library/angular"
import { ProductsComponent } from "./products.component"
import { ProductsService } from "../../../app/services/products/products.service"
import { StyledBtnComponent } from "../../../app/shared/styled-btn/styled-btn.component"
import { FeaturedImageComponent } from "./components/featured-image/featured-image.component"
import { ContentComponent } from "./components/content/content.component"
import { AddingFormComponent } from "./components/adding-form/adding-form.component"
import { FormsModule } from "@angular/forms"

describe("ProductsComponent", ()=>{
    const NEW_TESTING_PRODUCT = {
                name: "Nowy produkt",
                price: 3999.97,
                image: new File(["(⌐□_□)"], "testingimage.png", {type: "imagepng"})
            };
    beforeEach(async ()=>{
        window.URL.createObjectURL = jest.fn(()=>'newlink')
        await render(ProductsComponent, {
            providers: [ProductsService],
            declarations: [
                FeaturedImageComponent,
                ContentComponent,
                AddingFormComponent,
                StyledBtnComponent
            ],
            imports: [
                FormsModule
            ]
        });
    })

    // Integration of components and services
    it("should add product to devices grid on success form submit", async ()=>{
        const textInput = screen.getByRole("textbox", {hidden: true});
        const numberInput = screen.getByRole("spinbutton", {hidden: true});
        const fileInput = screen.getByTestId("input-file");
        const allInputs = [textInput, numberInput, fileInput];
        fireEvent.click(screen.getByRole("button", {name: "Dodaj nowy produkt"}));

        fireEvent.change(textInput, {target: {value: NEW_TESTING_PRODUCT.name}});
        fireEvent.change(numberInput, {target: {value: NEW_TESTING_PRODUCT.price}});
        await waitFor(()=>{
            fireEvent.change(fileInput, {
                target: { files: [NEW_TESTING_PRODUCT.image]}
            });
        });
        allInputs.forEach(input=>{
            input.dispatchEvent(new Event("input"));
        });
        fireEvent.click(screen.getByRole("button", {name: "Dodaj produkt"}));

        expect(screen.getByRole("heading", {name: NEW_TESTING_PRODUCT.name})).toBeInTheDocument();
        const formattedPrice = NEW_TESTING_PRODUCT.price.toString().replace(".", ",");
        expect(screen.getByText(`${formattedPrice} zł`)).toBeInTheDocument();
        // Not testing URL since it`s covered in more targeted unit tests
    });
})