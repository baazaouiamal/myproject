import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GreenHouseComponent } from "./green-house.component";

describe('GreenHouseComponent', () => {
  let component: GreenHouseComponent;
  let fixture: ComponentFixture<GreenHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
