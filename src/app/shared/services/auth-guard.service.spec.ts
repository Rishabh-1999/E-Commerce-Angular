import { TestBed } from "@angular/core/testing";

import { AuthGuard } from "shared/services/auth-guard.service";

describe("AuthGuard", () => {
  let service: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuard);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
