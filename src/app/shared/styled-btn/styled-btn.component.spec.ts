
import { fireEvent, render, screen } from '@testing-library/angular';
import { StyledBtnComponent } from './styled-btn.component';

describe('StyledBtnComponent', () => {
  const BTN_TYPE = "submit";
  const clickEvent = jest.fn()
  beforeEach(async ()=>{
    await render(StyledBtnComponent, {
      componentInputs: {
        btnType: BTN_TYPE,
        tabIndexNum: 2
      },
      componentOutputs:{
        clickEvent: {
          emit: clickEvent
        } as any,
      }
    })
  })
  it("should fire emit on click event", ()=>{
    fireEvent.click(screen.getByRole("button"));
    expect(clickEvent).toHaveBeenCalledTimes(1)
  })
  it("should set proper type based on input", ()=>{
    expect(screen.getByRole("button")).toHaveProperty("type", BTN_TYPE)
  })
  it("should` set proper tabIndex based on input", ()=>{
    expect(screen.getByRole("button")).toHaveProperty("tabIndex", 2);
  })
});
