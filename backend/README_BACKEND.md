<!-- prettier-ignore-start -->
###### KendyProject Backend ######
--------------------------------------------------------------
/** BEGIN

This might help you to write your comments:
* # Title
* * Important information is highlighted.
* ! Deprecated method, do not use.
* ? Should use this method be exposed in the Public API. 
* TODO : refactor this method so that it conforms to the API.

* Useful symbols:  📝 ✅ ❌ ⏳ ⏰
END **/
--------------------------------------------------------------

/**
-------------------------------------------
This file describes the data models (schema), APIs created to be called on the client side. and BACKEND partitions.
-------------------------------------------
* # DESCRIPTION :
KendyProject Server-Side 
Backend Frameworks:
* server : NodeJS, expressJS.
* DB : MongoDB.
-------------------------------------------

* # Project overview :
* * DATA MODELS AND APPIs
# User 

* User schema (backend/models/userModel)
- **name** : String | required
- **firstname** String | required
- **login** : String | required | unique
- **password**: String | required
- **userType**: Array | default: "Visiteur"
- **direction**: String | enum: ["Laboratoire", "USSCQ"]
- **grade**: String | enum: ["Cpl","CplCh","Sgt","SgtCh","Adj","AdjCh","AdjMaj","Slt","Lt","Cne","Cdt","LtCol","Col","ColMaj"]
- **dateLogin** : Date | default: Date.now()
- **firstConnect** : Boolean | default: true
- {timestamps: true}


* User APIs (backend/controllers/userControllers)

*0. userFirstConnect*
- **route** : PUT api/users/firstconnect
- **access** : Only KendyProject Members.
- **headers** : { ContentType: "application/json", Authorization: `Bearer ${userInfo.token}`}
- **response**: user password changed or error messages

*1. authUser*
- **route** : POST api/users/login
- **access** : Only KendyProject Members
- **headers** : { "Content-type": "application/json" }
- **body**: {login,password}
- **response**: user token or error messages

*2. registerUser*
- **route** : POST api/users
- **access** : Only KendyProject SuperAdmin
- **headers** : { "Content-type": "application/json" }
- **body**: (name, firstname, login, direction, grade, password, pic, confirm)
- **response**: user added or error messages

*3. updateUsers*
- **route** : PUT /api/users/${id}
- **access** : Only KendyProject SuperAdmin
- **headers** : { ContentType: "application/json", Authorization: `Bearer ${userInfo.token}`}
- **body**: (id, name, firstname, login, direction, grade, password)
- **response**: user updated or error messages

*4. listUsers*
- **route** : GET /api/users/listeutilisateurs
- **access** : Only KendyProject SuperAdmin
- **headers** : { Authorization: `Bearer ${userInfo.token}`}
- **response**: list of users or error messages

*5. deleteUser*
- **route** : DELETE /api/users/${id}
- **access** : Only KendyProject SuperAdmin
- **headers** : { Authorization: `Bearer ${userInfo.token}`}
- **body**: (id)
- **response**: user deleted or error messages

*6. updateProfile*
- **route** : POST /api/users/profile
- **access** : ALL KendyProject members
- **headers** : { ContentType: "application/json", Authorization: `Bearer ${userInfo.token}`}
- **response**: own profile updated or error messages


-------------------------------------------
# ProjectLabo

* ProjectLabo schema
- **name** : String | required 
- **admin** : [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }]
- **formateur** : [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
- **encryptionType** : String | required 
- **referenceType** : String | required enum: ["Image", "Texte"],
- **livrables** : Array | required 
- **livrablesType** : Boolean
- **docsRetour** : Array 
- **integration** : String | required 
- **description** : String | required 
- **partage** : Boolean | default: false 
- {timestamps: true}


* ! PS: .

* ProjectLabo APIs

*1. Add New ProjectLabo*
- **route** : 
- **access** : Only KendyProject SuperAdmin
- **headers** : 
- **body**: 
- **response**: project added or error messages































-------------------------------------------
# ProjectUssq

* ProjectUssq schema
- **name** : String | required 
- **admin** : String | required 
- **source** : String | required 
- **benificaire** : String | required 
- **periodeProject** : String | required 
- **integration** : String | required 
- **encryptionType** : String enum: ["Symetrique", "Asymetrique"]
- **lengthKey** : String enum: ["64-bit", "128-bit", "256-bit", "512-bit", "1024-bit"]
- **liaison** : String | required 
- **KeyDuration** : String | required 
- **description** : String | required 
- **partage** : Boolean | defauls: false 
- {timestamps: true}








* ProjectUssq APIs

* ! PS: .

-------------------------------------------
* # BACKEND PARTIONS
# Folders: 
* * -config(db.js(DB configuration)
* * -middleware(authMiddleware.js : JWT verifying by protect Logic(if the requested token is allowed and the user is authorized or not), errorMiddleware.js : ... , roleMiddleware.js : specify KendyProject possible roles)
* * -controllers(projectControllers.js : Projects APIs, userControllers.js : Users APIs)
* * -models(projectLaboModel.js, projectUssqModel.js & userModel.js : schemas)
* * -routes(projectRoutes.js, userRoutes.js : appRoutes with their APIs (REST APIs))
* * -utils( generateToken.js : generate a JWT)
* * -validation(isEmpty.js, Login.js & Register.js : forms validations)
<!-- * * -logger(index.js DefStream Logger definition for users & missions APIs, /PS: we apply this logger in routes folder (for the important APIs)) -->

# Files: 
* * -server.js (Starting point of the application)
* * -packages.json 
* * -.env (contains the constants which are used in the application)
-------------------------------------------


**/
<!-- prettier-ignore-end -->
