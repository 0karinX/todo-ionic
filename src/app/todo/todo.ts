
export class Todo {

  private type = "TODO"; // for p/couchDB views creation.

	constructor( public _id: 			string,
         public user:           string,
				 public name: 			    string,
				 public description: 	  string,
         public intendedDate:   string,
				 public dateCompleted:	string,
				 public deadline: 		  string,
         public dateCreated: 	  string,
         public dateUpdated: 	  string) {}
}
