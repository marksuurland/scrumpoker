import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerRoomDetailComponent } from './poker-room-detail.component';

describe('PokerRoomDetailComponent', () => {
  let component: PokerRoomDetailComponent;
  let fixture: ComponentFixture<PokerRoomDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokerRoomDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerRoomDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
