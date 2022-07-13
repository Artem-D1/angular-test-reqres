import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainListUsersComponent } from './main-list-users.component';

describe('MainListUsersComponent', () => {
  let component: MainListUsersComponent;
  let fixture: ComponentFixture<MainListUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainListUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
