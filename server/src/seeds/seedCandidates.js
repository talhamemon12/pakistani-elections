
const {connect} = require('../config/db'); // Adjust the path based on your folder structure
const Candidate = require('../models/Candidate');

// Sample Candidate Data
const candidates = [
    {
        candidateID: 'CAND001',
        firstName: 'Asad',
        lastName: 'Umar',
        gender: 'Male',
        dateOfBirth: new Date('1971-09-08'),
        placeOfBirth: 'Islamabad',
        religion: 'Islam',
        maritalStatus: 'Married',
        spouse: { name: 'N/A', dateOfBirth: new Date('1975-12-12'), occupation: 'Housewife' },
        children: [{ name: 'Ali Asad', dateOfBirth: new Date('2000-01-01'), occupation: 'Student' }],
        phoneNumber: '03001234567',
        email: 'asad.umar@pti.org.pk',
        socialMediaLinks: { twitter: '@Asad_Umar', facebook: '/AsadUmarOfficial' },
        address: { street: 'House 123', city: 'Islamabad', province: 'Islamabad Capital Territory', postalCode: '44000', country: 'Pakistan' },
        politicalBackground: {
            partyMembership: 'PTI',
            politicalPositionsHeld: [
                { positionTitle: 'Federal Minister', duration: '2018-2022', responsibilities: 'Finance and Economic Affairs' }
            ],
        },
    },
    {
        candidateID: 'CAND002',
        firstName: 'Ghulam',
        lastName: 'Sarwar Khan',
        gender: 'Male',
        dateOfBirth: new Date('1954-05-07'),
        placeOfBirth: 'Rawalpindi',
        religion: 'Islam',
        maritalStatus: 'Married',
        spouse: { name: 'N/A', dateOfBirth: new Date('1956-10-15'), occupation: 'Housewife' },
        children: [{ name: 'Sadia Sarwar', dateOfBirth: new Date('1982-02-10'), occupation: 'Lawyer' }],
        phoneNumber: '03002345678',
        email: 'ghulam.sarwar@pti.org.pk',
        socialMediaLinks: { twitter: '@GhulamSarwarPTI', facebook: '/GhulamSarwarKhanOfficial' },
        address: { street: 'Street 45', city: 'Rawalpindi', province: 'Punjab', postalCode: '44000', country: 'Pakistan' },
        politicalBackground: {
            partyMembership: 'PTI',
            politicalPositionsHeld: [
                { positionTitle: 'Minister for Aviation', duration: '2018-2022', responsibilities: 'Aviation Management' }
            ],
        },
    },
    {
        candidateID: 'CAND003',
        firstName: 'Sardar',
        lastName: 'Mohammad Shafqat Hayat Khan',
        gender: 'Male',
        dateOfBirth: new Date('1965-03-22'),
        placeOfBirth: 'Peshawar',
        religion: 'Islam',
        maritalStatus: 'Married',
        spouse: { name: 'N/A', dateOfBirth: new Date('1967-01-12'), occupation: 'Housewife' },
        children: [{ name: 'Ali Hayat', dateOfBirth: new Date('1990-06-30'), occupation: 'Business Owner' }],
        phoneNumber: '03003456789',
        email: 'shafqat.hayat@pmln.org.pk',
        socialMediaLinks: { twitter: '@ShafqatHayat', facebook: '/SardarShafqatOfficial' },
        address: { street: 'Street 10', city: 'Peshawar', province: 'Khyber Pakhtunkhwa', postalCode: '25000', country: 'Pakistan' },
        politicalBackground: {
            partyMembership: 'PML-N',
            politicalPositionsHeld: [
                { positionTitle: 'Member National Assembly', duration: '2013-2018', responsibilities: 'Legislative Affairs' }
            ],
        },
    },
    {
        candidateID: 'CAND004',
        firstName: 'Anwarul',
        lastName: 'Haq',
        gender: 'Male',
        dateOfBirth: new Date('1974-11-16'),
        placeOfBirth: 'Lahore',
        religion: 'Islam',
        maritalStatus: 'Single',
        phoneNumber: '03004567890',
        email: 'anwarul.haq@ppp.org.pk',
        socialMediaLinks: { twitter: '@AnwarulHaqPPP', facebook: '/AnwarHaqPPP' },
        address: { street: 'Street 35', city: 'Lahore', province: 'Punjab', postalCode: '54000', country: 'Pakistan' },
        politicalBackground: {
            partyMembership: 'PPP',
            politicalPositionsHeld: [
                { positionTitle: 'Member Provincial Assembly', duration: '2013-2018', responsibilities: 'Local Government and Development' }
            ],
        },
    },
    {
        candidateID: 'CAND005',
        firstName: 'Muhammad',
        lastName: 'Akram',
        gender: 'Male',
        dateOfBirth: new Date('1980-06-12'),
        placeOfBirth: 'Karachi',
        religion: 'Islam',
        maritalStatus: 'Married',
        spouse: { name: 'N/A', dateOfBirth: new Date('1982-09-05'), occupation: 'Housewife' },
        children: [{ name: 'Fatima Akram', dateOfBirth: new Date('2005-03-21'), occupation: 'Student' }],
        phoneNumber: '03005678901',
        email: 'muhammad.akram@tlp.org.pk',
        socialMediaLinks: { twitter: '@MuhammadAkramTLP', facebook: '/MuhammadAkramTLP' },
        address: { street: 'Street 50', city: 'Karachi', province: 'Sindh', postalCode: '75600', country: 'Pakistan' },
        politicalBackground: {
            partyMembership: 'TLP',
            politicalPositionsHeld: [
                { positionTitle: 'Party Candidate', duration: '2018', responsibilities: 'Political Advocacy' }
            ],
        },
    },
    // Next set of 20 candidates
    {
        candidateID: 'CAND006',
        firstName: 'Imran',
        lastName: 'Ismail',
        gender: 'Male',
        dateOfBirth: new Date('1967-11-15'),
        placeOfBirth: 'Karachi',
        religion: 'Islam',
        maritalStatus: 'Married',
        spouse: { name: 'N/A', dateOfBirth: new Date('1970-04-12'), occupation: 'Housewife' },
        children: [{ name: 'Amina Ismail', dateOfBirth: new Date('2002-02-15'), occupation: 'Student' }],
        phoneNumber: '03007890123',
        email: 'imran.ismail@pti.org.pk',
        socialMediaLinks: { twitter: '@ImranIsmailPTI', facebook: '/ImranIsmailOfficial' },
        address: { street: 'Street 67', city: 'Karachi', province: 'Sindh', postalCode: '75350', country: 'Pakistan' },
        politicalBackground: {
            partyMembership: 'PTI',
            politicalPositionsHeld: [
                { positionTitle: 'Governor Sindh', duration: '2018-2022', responsibilities: 'Administration of Sindh Province' }
            ],
        },
    },
    {
        candidateID: 'CAND007',
        firstName: 'Syed',
        lastName: 'Ghazi Gulab Jamal',
        gender: 'Male',
        dateOfBirth: new Date('1985-03-28'),
        placeOfBirth: 'Hyderabad',
        religion: 'Islam',
        maritalStatus: 'Single',
        phoneNumber: '03007892345',
        email: 'ghazi.jamal@ppp.org.pk',
        socialMediaLinks: { twitter: '@GhaziJamalPPP', facebook: '/SyedGhaziJamal' },
        address: { street: 'Street 15', city: 'Hyderabad', province: 'Sindh', postalCode: '76000', country: 'Pakistan' },
        politicalBackground: {
            partyMembership: 'PPP',
            politicalPositionsHeld: [
                { positionTitle: 'Member Sindh Assembly', duration: '2013-2018', responsibilities: 'Local Governance' }
            ],
        },
    },
    {
        candidateID: 'CAND008',
        firstName: 'Karamat',
        lastName: 'Ali',
        gender: 'Male',
        dateOfBirth: new Date('1972-12-05'),
        placeOfBirth: 'Karachi',
        religion: 'Islam',
        maritalStatus: 'Married',
        spouse: { name: 'N/A', dateOfBirth: new Date('1975-07-25'), occupation: 'Housewife' },
        children: [{ name: 'Karamat Ali Jr.', dateOfBirth: new Date('2001-06-22'), occupation: 'Student' }],
        phoneNumber: '03002345689',
        email: 'karamat.ali@mqp.org.pk',
        socialMediaLinks: { twitter: '@KaramatAliMQM', facebook: '/KaramatAliMQM' },
        address: { street: 'Street 25', city: 'Karachi', province: 'Sindh', postalCode: '75800', country: 'Pakistan' },
        politicalBackground: {
            partyMembership: 'MQM-P',
            politicalPositionsHeld: [
                { positionTitle: 'MemberHere is an additional segment for the list of candidates, continuing from where we left off'}

            ],
        },
    },
    {
        candidateID: 'CAND009',
        firstName: 'Shahida',
        lastName: 'Malik',
        gender: 'Female',
        dateOfBirth: new Date('1980-09-15'),
        placeOfBirth: 'Faisalabad',
        religion: 'Islam',
        maritalStatus: 'Single',
        phoneNumber: '03001234599',
        email: 'shahida.malik@pti.org.pk',
        socialMediaLinks: { twitter: '@ShahidaMalikPTI', facebook: '/ShahidaMalikOfficial' },
        address: { street: 'Street 25', city: 'Faisalabad', province: 'Punjab', postalCode: '38000', country: 'Pakistan' },
        politicalBackground: {
            partyMembership: 'PTI',
            politicalPositionsHeld: [
                { positionTitle: 'Member National Assembly', duration: '2018-2023', responsibilities: 'Women’s Rights and Empowerment' }
            ],
        },
    },
    {
        candidateID: 'CAND010',
        firstName: 'Rizwan',
        lastName: 'Ahmed',
        gender: 'Male',
        dateOfBirth: new Date('1977-02-20'),
        placeOfBirth: 'Lahore',
        religion: 'Islam',
        maritalStatus: 'Married',
        spouse: { name: 'N/A', dateOfBirth: new Date('1980-10-25'), occupation: 'Housewife' },
        children: [{ name: 'Zara Ahmed', dateOfBirth: new Date('2006-04-16'), occupation: 'Student' }],
        phoneNumber: '03004567801',
        email: 'rizwan.ahmed@pmln.org.pk',
        socialMediaLinks: { twitter: '@RizwanAhmedPMLN', facebook: '/RizwanAhmedOfficial' },
        address: { street: 'Street 10', city: 'Lahore', province: 'Punjab', postalCode: '54000', country: 'Pakistan' },
        politicalBackground: {
            partyMembership: 'PML-N',
            politicalPositionsHeld: [
                { positionTitle: 'Member Provincial Assembly', duration: '2013-2018', responsibilities: 'Development and Welfare' }
            ],
        },
    },
    {
        candidateID: 'CAND011',
        firstName: 'Mariam',
        lastName: 'Ali',
        gender: 'Female',
        dateOfBirth: new Date('1983-08-10'),
        placeOfBirth: 'Multan',
        religion: 'Islam',
        maritalStatus: 'Single',
        phoneNumber: '03002345656',
        email: 'mariam.ali@ppp.org.pk',
        socialMediaLinks: { twitter: '@MariamAliPPP', facebook: '/MariamAliOfficial' },
        address: { street: 'Street 38', city: 'Multan', province: 'Punjab', postalCode: '60000', country: 'Pakistan' },
        politicalBackground: {
            partyMembership: 'PPP',
            politicalPositionsHeld: [
                { positionTitle: 'Party Spokesperson', duration: '2015-2020', responsibilities: 'Public Relations and Outreach' }
            ],
        },
    },
    {
        candidateID: 'CAND012',
        firstName: 'Nasir',
        lastName: 'Mehmood',
        gender: 'Male',
        dateOfBirth: new Date('1988-03-30'),
        placeOfBirth: 'Karachi',
        religion: 'Islam',
        maritalStatus: 'Married',
        spouse: { name: 'N/A', dateOfBirth: new Date('1990-05-12'), occupation: 'Housewife' },
        children: [{ name: 'Sara Mehmood', dateOfBirth: new Date('2015-06-20'), occupation: 'Student' }],
        phoneNumber: '03006789012',
        email: 'nasir.mehmood@mqp.org.pk',
        socialMediaLinks: { twitter: '@NasirMehmoodMQM', facebook: '/NasirMehmoodOfficial' },
        address: { street: 'Street 45', city: 'Karachi', province: 'Sindh', postalCode: '75100', country: 'Pakistan' },
        politicalBackground: {
            partyMembership: 'MQM-P',
            politicalPositionsHeld: [
                { positionTitle: 'Member Sindh Assembly', duration: '2013-2018', responsibilities: 'Public Safety' }
            ],
        },
    },
    {
        candidateID: 'CAND013',
        firstName: 'Muneeb',
        lastName: 'Ahmed',
        gender: 'Male',
        dateOfBirth: new Date('1974-04-15'),
        placeOfBirth: 'Sialkot',
        religion: 'Islam',
        maritalStatus: 'Married',
        spouse: { name: 'N/A', dateOfBirth: new Date('1976-11-22'), occupation: 'Housewife' },
        children: [{ name: 'Adeel Ahmed', dateOfBirth: new Date('2002-09-30'), occupation: 'Student' }],
        phoneNumber: '03005678923',
        email: 'muneeb.ahmed@pti.org.pk',
        socialMediaLinks: { twitter: '@MuneebAhmedPTI', facebook: '/MuneebAhmedOfficial' },
        address: { street: 'Street 20', city: 'Sialkot', province: 'Punjab', postalCode: '51310', country: 'Pakistan' },
        politicalBackground: {
            partyMembership: 'PTI',
            politicalPositionsHeld: [
                { positionTitle: 'Member National Assembly', duration: '2018-2023', responsibilities: 'Development and Economic Policy' }
            ],
        },
    },
    {
        candidateID: 'CAND014',
        firstName: 'Naeem',
        lastName: 'Raza',
        gender: 'Male',
        dateOfBirth: new Date('1983-12-25'),
        placeOfBirth: 'Islamabad',
        religion: 'Islam',
        maritalStatus: 'Single',
        phoneNumber: '03003456790',
        email: 'naeem.raza@pmln.org.pk',
        socialMediaLinks: { twitter: '@NaeemRazaPMLN', facebook: '/NaeemRazaOfficial' },
        address: { street: 'Street 15', city: 'Islamabad', province: 'Islamabad Capital Territory', postalCode: '44000', country: 'Pakistan' },
        politicalBackground: {
            partyMembership: 'PML-N',
            politicalPositionsHeld: [
                { positionTitle: 'Member National Assembly', duration: '2013-2018', responsibilities: 'Infrastructure and Development' }
            ],
        },
    },
    {
        candidateID: 'CAND015',
        firstName: 'Ayesha',
        lastName: 'Siddiqa',
        gender: 'Female',
        dateOfBirth: new Date('1989-10-10'),
        placeOfBirth: 'Rawalpindi',
        religion: 'Islam',
        maritalStatus: 'Single',
        phoneNumber: '03004567891',
        email: 'ayesha.siddiqa@pmln.org.pk',
        socialMediaLinks: { twitter: '@AyeshaSiddiqaPMLN', facebook: '/AyeshaSiddiqaOfficial' },
        address: { street: 'Street 80', city: 'Rawalpindi', province: 'Punjab', postalCode: '46000', country: 'Pakistan' },
        politicalBackground: {
            partyMembership: 'PML-N',
            politicalPositionsHeld: [
                { positionTitle: 'Youth Affairs Spokesperson', duration: '2016-2020', responsibilities: 'Youth Engagement and Advocacy' }
            ],
        },
    },
    {
        candidateID: 'CAND016',
        firstName: 'Junaid',
        lastName: 'Khan',
        gender: 'Male',
        dateOfBirth: new Date('1990-05-20'),
        placeOfBirth: 'Mardan',
        religion: 'Islam',
        maritalStatus: 'Single',
        phoneNumber: '03005678945',
        email: 'junaid.khan@pti.org.pk',
        socialMediaLinks: { twitter: '@JunaidKhanPTI', facebook: '/JunaidKhanOfficial' },
        address: { street: 'Street 12', city: 'Mardan', province: 'Khyber Pakhtunkhwa', postalCode: '23200', country: 'Pakistan' },
        politicalBackground: {
            partyMembership: 'PTI',
            politicalPositionsHeld: [
                { positionTitle: 'Party Member', duration: '2015-2020', responsibilities: 'Campaigning and Outreach' }
            ],
        },
    },
    {
        candidateID: 'CAND017',
        firstName: 'Khalid',
        lastName: 'Ibrahim',
        gender: 'Male',
        dateOfBirth: new Date('1981-03-22'),
        placeOfBirth: 'Quetta',
        religion: 'Islam',
        maritalStatus: 'Married',
        spouse: { name: 'N/A', dateOfBirth: new Date('1984-07-12'), occupation: 'Housewife' },
        children: [{ name: 'Hassan Ibrahim', dateOfBirth: new Date('2007-08-14'), occupation: 'Student' }],
        phoneNumber: '03005678967',
        email: 'khalid.ibrahim@bnp.org.pk',
        socialMediaLinks: { twitter: '@KhalidIbrahimBNP', facebook: '/KhalidIbrahimBNP' },
        address: { street: 'Street 25', city: 'Quetta', province: 'Balochistan', postalCode: '87300', country: 'Pakistan' },
        politicalBackground: {
            partyMembership: 'BNP',
            politicalPositionsHeld: [
                { positionTitle: 'Member Provincial Assembly', duration: '2013-2018', responsibilities: 'Balochistan Development' }
            ],
        },
    }
];


// Seed Function
const seedCandidates = async () => {
    try {
        console.log('Connecting to Database...');
        await connect(); // Use the connect function from db.js
        console.log('Database Connected');

        console.log('Clearing Existing Candidates...');
        await Candidate.deleteMany(); // Clear previous records
        console.log('Existing Candidates Removed');

        console.log('Inserting Candidates...');
        await Candidate.insertMany(candidates);
        console.log('Candidates Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

// Run Seeding
seedCandidates();
