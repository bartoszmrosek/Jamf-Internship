import {render, screen, within} from "@testing-library/angular"

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  beforeEach(async ()=>{
    await render(NavbarComponent)
  })
  it("should contain jamf logo", async ()=>{
    expect(screen.getByAltText("Logo Jamf")).toBeInTheDocument()
  })
  it("should contain button to add new form", ()=>{
    const button = screen.getByRole("button");
    expect(within(button).getByAltText("Ikona plusa")).toBeInTheDocument()
  })
});
