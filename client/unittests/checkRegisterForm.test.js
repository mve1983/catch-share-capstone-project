import { checkRegisterForm } from "../src/lib/userRegisterValidation";

describe("are all fields of register correct filled", () => {
  it("should be valid if all fields are correctly filled", () => {
    const testUser = {
      name: "TestUser",
      email: "test@test.com",
      password: "111111",
      confirmPassword: "111111",
    };
    expect(
        checkRegisterForm(
        testUser.name,
        testUser.email,
        testUser.password,
        testUser.confirmPassword
      )
    ).toStrictEqual([true, ""]);
  });

  it("should be NOT valid if name is shorter than two signs", () => {
    const testUser = {
      name: "T",
      email: "test@test.com",
      password: "111111",
      confirmPassword: "111111",
    };
    expect(
        checkRegisterForm(
        testUser.name,
        testUser.email,
        testUser.password,
        testUser.confirmPassword
      )
    ).toStrictEqual([false, "Name muss mindestens 2 Zeichen haben."]);
  });

  it("should be NOT valid if email not includes @ or .", () => {
    const testUser = {
      name: "TestUser",
      email: "testtest.com",
      password: "111111",
      confirmPassword: "111111",
    };

    const testUser2 = {
        name: "TestUser2",
        email: "test@testcom",
        password: "111111",
        confirmPassword: "111111",
      };
    expect(
        checkRegisterForm(
        testUser.name,
        testUser.email,
        testUser.password,
        testUser.confirmPassword
      )
    ).toStrictEqual([false, "Bitte E-Mail überprüfen."]);
    expect(
        checkRegisterForm(
        testUser2.name,
        testUser2.email,
        testUser2.password,
        testUser2.confirmPassword
      )
    ).toStrictEqual([false, "Bitte E-Mail überprüfen."]);
  });

  it("should be NOT valid if password length is under 6 signs", () => {
    const testUser = {
      name: "TestUser",
      email: "test@test.com",
      password: "11111",
      confirmPassword: "11111",
    };
    expect(
        checkRegisterForm(
        testUser.name,
        testUser.email,
        testUser.password,
        testUser.confirmPassword
      )
    ).toStrictEqual([false, "Passwort muss mindestens 6 Zeichen haben."]);
  });

  it("should be NOT valid if password and confirmPassword are different", () => {
    const testUser = {
      name: "TestUser",
      email: "test@test.com",
      password: "111111",
      confirmPassword: "11111111111111",
    };
    expect(
        checkRegisterForm(
        testUser.name,
        testUser.email,
        testUser.password,
        testUser.confirmPassword
      )
    ).toStrictEqual([false, "Passwörter stimmen nicht überein."]);
  });
});
