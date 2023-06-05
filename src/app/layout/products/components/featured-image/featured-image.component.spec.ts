
import { render, screen } from '@testing-library/angular';
import { FeaturedImageComponent } from './featured-image.component';

describe('FeaturedImageComponent', () => {
  const ALT = "Wyróżnione zdjęcie";
  const SRC = "assets/featured-image.jfif";
  beforeEach(async ()=>{
    await render(FeaturedImageComponent, {
      componentInputs: {
        src: SRC,
        alt: ALT
      }
    })
  })
  it("should have alt set properly", ()=>{
    expect(screen.getByAltText(ALT)).toBeInTheDocument()
  })
  it("should have src set properly", ()=>{
    expect(screen.getByRole("img")).toHaveAttribute("src", SRC);
  })
});
