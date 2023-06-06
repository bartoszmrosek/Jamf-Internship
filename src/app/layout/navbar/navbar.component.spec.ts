import {fireEvent, render, screen, within} from "@testing-library/angular"

import { NavbarComponent } from './navbar.component';
import { ProductsService } from "../../../app/services/products/products.service";

describe('NavbarComponent', () => {
  const formOpeningMock = jest.fn();
  beforeEach(async ()=>{
    await render(NavbarComponent, {
      componentProviders: [
        {
          provide: ProductsService,
          useValue: {
            openAddingForm: formOpeningMock
          }
        }
      ]
    })
  })
  it("should contain jamf logo", async ()=>{
    expect(screen.getByAltText("Logo Jamf")).toBeInTheDocument()
  })
  it("should contain button to add new form", ()=>{
    const button = screen.getByRole("button");
    expect(within(button).getByAltText("Ikona plusa")).toBeInTheDocument()
  })
  it("should fire form opening callback on click", ()=>{
    fireEvent.click(screen.getByRole("button"));
    expect(formOpeningMock).toHaveBeenCalledTimes(1)
  })
});
