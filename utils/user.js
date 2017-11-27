// Define Users class

class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const newUser = { id, name, room };
    this.users.push(newUser);
    return newUser;
  }

  removeUser(id) {
    const person = this.getUser(id);
    if (person) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return person;
  }

  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }

  getUserList(room) {
    const users = this.users.filter(user => user.room === room);
    return users.map(user => user.name);
  }
}

// Export Modules
module.exports = {
  Users,
};
