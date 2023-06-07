import { FormsModule } from "@angular/forms";
import { fireEvent, render, screen, waitFor } from "@testing-library/angular"
import { AddingFormComponent } from "./adding-form.component"
import { ProductsService } from "../../../../../app/services/products/products.service"
import { BehaviorSubject } from "rxjs"
import { StyledBtnComponent } from "../../../../../app/shared/styled-btn/styled-btn.component";
import { ComponentFixture } from "@angular/core/testing";

describe("AddingForm", ()=>{
    describe("tests closed form attributes and visibility", ()=>{
        beforeEach(async ()=>{
            await render(AddingFormComponent, {
                providers: [{
                    provide: ProductsService,
                    useValue: {
                        _isAdding$: new BehaviorSubject(false)
                    }
                }],
                imports: [
                    FormsModule
                ],
                declarations: [
                    StyledBtnComponent
                ]
            })
        })
        it("should not be visible to screen readers", ()=>{
            expect(screen.getByTestId("adding-form")).toHaveAttribute("aria-hidden", "true");
        })
        it("all buttons shouldn`t be tab focusable", ()=>{
            const allBtns = screen.getAllByRole("button", {hidden: true});
            allBtns.forEach(btn=>{
                expect(btn).toHaveAttribute("tabIndex", "-1");
            });
        })
        it("all inputs shouldn`t be tab focusable", ()=>{
            const allInputs: HTMLInputElement[] = [];
            allInputs.push(screen.getByRole("textbox", {hidden: true}));
            allInputs.push(screen.getByRole("spinbutton", {hidden: true}));
            allInputs.push(screen.getByTestId("input-file"));
            allInputs.forEach(input=>{
                expect(input).toHaveAttribute("tabIndex", "-1");
            });
        })
    })

    describe("tests open form", ()=>{
        let stopFormMock: jest.Mock;
        let addProductMock: jest.Mock;
        let compoonentFixture: ComponentFixture<AddingFormComponent>;
        beforeEach(async ()=>{
            stopFormMock = jest.fn();
            addProductMock = jest.fn();
            window.URL.createObjectURL = jest.fn(()=>'newlink')
            const {fixture} = await render(AddingFormComponent, {
                providers: [{
                    provide: ProductsService,
                    useValue: {
                        _isAdding$: new BehaviorSubject(true),
                        stopAddingForm: stopFormMock,
                        addProduct: addProductMock
                    }
                }],
                imports: [
                    FormsModule
                ],
                declarations: [
                    StyledBtnComponent
                ]
            })
            compoonentFixture = fixture;
        })

        it("should fire callback on X button", ()=>{
            fireEvent.click(screen.getByLabelText("Close form"));
            expect(stopFormMock).toHaveBeenCalledTimes(1);
        })
        
        describe("ARIA and visibility tests", ()=>{
            it("should be visible to screen readers", ()=>{
                expect(screen.getByTestId("adding-form")).toHaveAttribute("aria-hidden", "false");
            })
            it("all buttons should be tab focusable", ()=>{
                const allBtns = screen.getAllByRole("button");
                allBtns.forEach(btn=>{
                    expect(btn).toHaveAttribute("tabIndex", "0");
                });
            })
            it("all inputs should be tab focusable", ()=>{
                const allInputs: HTMLInputElement[] = [];
                allInputs.push(screen.getByRole("textbox"));
                allInputs.push(screen.getByRole("spinbutton"));
                allInputs.push(screen.getByTestId("input-file"));
                allInputs.forEach(input=>{
                    expect(input).toHaveAttribute("tabIndex", "0");
                });
            })
        })
        describe("form handling tests", ()=>{
            const NEW_TESTING_PRODUCT = {
                name: "Nowy produkt",
                price: 3999.97,
                image: new File(["(⌐□_□)"], "testingimage.png", {type: "imagepng"})
            };

            let textInput: HTMLInputElement;
            let numberInput: HTMLInputElement;
            let fileInput: HTMLInputElement;
            let submitBtn: HTMLButtonElement;

            beforeEach(async ()=>{
                textInput = screen.getByRole("textbox");
                fireEvent.change(textInput, {target: {value: NEW_TESTING_PRODUCT.name}});
                textInput.dispatchEvent(new Event("input"));
                
                numberInput = screen.getByRole("spinbutton");
                fireEvent.change(numberInput, {target: {value: NEW_TESTING_PRODUCT.price}});
                numberInput.dispatchEvent(new Event("input"));

                await waitFor(()=>{
                    fileInput = screen.getByTestId("input-file");
                    fireEvent.change(fileInput, {
                        target: { files: [NEW_TESTING_PRODUCT.image]}
                    });
                    fileInput.dispatchEvent(new Event("input"));
                });

                compoonentFixture.detectChanges();
                submitBtn = screen.getByRole("button", {name: "Dodaj produkt"});
            })

            it("shouldn`t submit if any field is invalid", ()=>{
                fireEvent.change(textInput, {target: {value: ""}});
                textInput.dispatchEvent(new Event("input"));
                fireEvent.click(submitBtn);
                expect(addProductMock).toHaveBeenCalledTimes(0);
                expect(stopFormMock).toHaveBeenCalledTimes(0);
            })

            it("should fire closing form callback on successful submit", ()=>{
                fireEvent.click(submitBtn);
                expect(stopFormMock).toHaveBeenCalledTimes(1);
            });

            it("should fire adding product callback on successful submit", ()=>{
                fireEvent.click(submitBtn);
                expect(addProductMock).toHaveBeenCalledTimes(1);
                expect(addProductMock).toHaveBeenCalledWith({
                    imageUrl: "newlink",
                    name: NEW_TESTING_PRODUCT.name,
                    price: NEW_TESTING_PRODUCT.price
                });
            })

            it("should reset form on successful submit", ()=>{
                fireEvent.click(submitBtn);
                expect(textInput).toHaveValue("");
                // Due to angular resetting input type number this is null rather than initial 0
                expect(numberInput).toHaveValue(null);
            })
        })
    })
})