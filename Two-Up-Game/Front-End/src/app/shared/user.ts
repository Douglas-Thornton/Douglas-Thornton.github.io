interface Serializable<T> {
  deserialize(input: Object): T;
}

/*
This class represents a user account from the database.
It does not store the users password.

*/
export class user implements Serializable<user> {

  id: number = 0;
  username: string = "";
  email: string = "";
  score: number = 0;
  favColorHex: string = "";

  deserialize(input:any) {
      console.log("Deserializing user: " + input[0]);
      this.id = Number.parseInt(input[0].id);
      this.username = input[0].username;
      this.email = input[0].email;
      this.score = Number.parseInt(input[0].score);
      if(input[0].favColorHex == undefined)
      {
        this.favColorHex = "#FFFFFF"
      }
      else
      {
        this.favColorHex = input[0].favColorHex;
      }

      return this;
  }
}
