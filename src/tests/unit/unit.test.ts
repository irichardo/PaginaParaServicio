import { Role, UserTypes } from "../../libs/types";
import { createdUserInDB } from "../../domain/services/createUserService";
import SequelizeUser from "../../infrastructure/database/models/user";

describe("createUserInDB", () => {
  it("debería crear un usuario correctamente", async () => {
    const user: UserTypes = {
      email: "user@example.com",
      password: "password",
      username: "user@example.com",
      role: Role.client,
    };
    const createSpy = jest.spyOn(SequelizeUser, "create");
    createSpy.mockResolvedValue(user);
    const createdUser = await createdUserInDB(user);
    console.log(createdUser);
    // expect(createdUser).toEqual(user.email);
    // expect(createdUser.subscriptionId).toBeDefined();
    // expect(createdUser.subscriptionId).not.toBeNull();
    createSpy.mockRestore();
  });
});
