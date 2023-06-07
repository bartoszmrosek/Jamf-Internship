import { BehaviorSubject } from "rxjs";

import { fireEvent, render, screen } from '@testing-library/angular';
import { ContentComponent } from './content.component';
import { INITIAL_PRODUCTS, ProductsService } from '../../../../../app/services/products/products.service';
import { StyledBtnComponent } from '../../../../../app/shared/styled-btn/styled-btn.component';

describe('ContentComponent', () => {
  const openingFormMock = jest.fn();

  beforeEach(async ()=>{
    await render(ContentComponent, {
      providers: [{
        provide: ProductsService,
        useValue: {
          openAddingForm: openingFormMock,
          _productList$: new BehaviorSubject(INITIAL_PRODUCTS)
        }
      }],
      declarations: [StyledBtnComponent]
    })
  })

  it("should fire form opening callback on btn click", ()=>{
    fireEvent.click(screen.getByRole("button"));
    expect(openingFormMock).toHaveBeenCalledTimes(1);
  })

  it("should initialy containt 4 products sections", ()=>{
    expect(screen.getAllByTestId("products-section")).toHaveLength(4);
  })

  it("should display image with specified alt", ()=>{
    const image = screen.getByAltText(INITIAL_PRODUCTS[0].alt as string);
    expect(image).toBeInTheDocument();
  })
  it("should display images with generic alts", ()=>{
    const images = screen.getAllByAltText("Zdjęcie poglądowe produktu");
    expect(images).toHaveLength(3);
  })
  it("should display image with proper src", ()=>{
     const image = screen.getByAltText(INITIAL_PRODUCTS[0].alt as string);
    expect(image).toHaveProperty("src", `http://localhost/${INITIAL_PRODUCTS[0].imageUrl}`);
  })
  it("should display product with proper heading", ()=>{
    expect(screen.getByRole("heading", {name: INITIAL_PRODUCTS[0].name}));
  })
  it("should display product with proper price", ()=>{
    expect(screen.getByText(`${INITIAL_PRODUCTS[0].price},00 zł`));
  })
});
