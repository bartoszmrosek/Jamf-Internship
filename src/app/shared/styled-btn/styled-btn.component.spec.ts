
import { fireEvent, render, screen } from '@testing-library/angular';
import { StyledBtnComponent } from './styled-btn.component';

describe('StyledBtnComponent', () => {
  const clickEvent = jest.fn()
  beforeEach(async ()=>{
    await render(StyledBtnComponent, {
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
});
