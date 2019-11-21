import { FirebaseServices } from "../../../services/firebase"
import { collections } from "../../../constant/FirebaseEnum"
import { IEmployee } from "../../../model/IEmployee";

class UserException {
    message = "Your account has been banned";
    status = 401;
}
class ErrorException {
    status = 400;
}

export const authAPI = async (email: string, password: string) => {
    try {
        await FirebaseServices.auth.signInWithEmailAndPassword(email, password)
        const doc: any = await FirebaseServices.db.collection(collections.employees).doc(email).get()
        if (doc.exists) {
            const employee: IEmployee = {
                ...doc.data(),
                birthday: doc.data().birthday.toDate(),
                createAt: doc.data().createAt.toDate(),
                updateAt: doc.data().updateAt.toDate()
            }
            if (employee.isDeleted === true)
                throw new UserException();
            else
                return {
                    status: 200,
                    employee
                }
        } else {
            throw new ErrorException();
        }
    } catch (error) {
        return error
    }
}

export const signOutAPI = async () => {
    try {
        FirebaseServices.auth.signOut()
        return { status: 200, message: "Sign out success" }
    } catch (error) {
        return error
    }
}
