import Firebase from '../../config/firebase';
// import { installActionNames } from '..';
const db = Firebase.getFirestore();

export const service = {
    async addCustomer(values) {
        let docRef = await db.collection('customers').add({
            ...values,
        });

        let customers = {};
        let doc = await docRef.get();
        let docId = doc.id;
        customers = { docId, ...doc.data() };

        return customers;
    },

    async getCustomers() {
        let customers = [];
        let querySnapshot = await db.collection('customers').get();
        querySnapshot.forEach(doc => {
            let docId = doc.id;
            let customerData = doc.data();
            let jobPaths = customerData.jobs.map(job => job.path);
            customerData.jobs = jobPaths;
            let customer = { docId, ...customerData };
            customers.push(customer);
        });
        return customers;
    },

    async getCustomerJobs(jobPaths) {
        let promises = [];

        //Create a promise for each job Path
        jobPaths.forEach(path => {
            path = path.slice(path.indexOf('/') + 1);
            promises.push(
                db
                    .collection('jobs')
                    .doc(path)
                    .get()
            );
        });

        //Resolve all the promises
        let docSnaps = await Promise.all(promises);

        //map each resolved promise to the jobs table
        let jobs = docSnaps.map(docSnap => {
            let docId = docSnap.id;
            return { docId, ...docSnap.data() };
        });

        return jobs;
    },
};

// export default installActionNames(service);
