export const adminMenu = [
    {
        //Quản lí
        name: 'admin.manage.header',
        menus: [
            {
                name: 'admin.manage.admin',
                link: '/system/user-manage',
            },
            {
                name: 'admin.manage.doctor',
                link: '/system/manage-doctor',
            },
            {
                name: 'admin.manage.reduxCRUD',
                link: '/system/user-redux',
            },
            {
                name: 'admin.manage.SheduleDoctor',
                link: '/system/manage-doctor-schedule',
            },
        ],
    },
    {
        //Clinic
        name: 'admin.clinic.header',
        menus: [
            {
                name: 'admin.clinic.manage-clinic',
                link: '/system/manage-clinic',
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ],
    },
    {
        //Specialty
        name: 'admin.specialty.header',
        menus: [
            {
                name: 'admin.specialty.manage-specialty',
                link: '/system/manage-specialty',
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ],
    },
    {
        //HandBook
        name: 'admin.handbook.header',
        // menus: [
        //     {},
        //     // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        // ],
    },
];

export const doctorMenu = [
    {
        //Manage belong to doctor
        name: 'doctor.manage.header',
        menus: [
            {
                name: 'doctor.manage.schedule',
                link: '/doctor/manage/schedule',
            },
            {
                name: 'doctor.manage.info-personality',
                link: '/doctor/manage/personality',
            },
        ],
    },
    {
        // Patient of Doctor
        name: 'doctor.patient.header',
        menus: [
            {
                name: 'doctor.patient.listPatient',
                link: '/doctor/manage/patient',
            },
        ],
    },
    {
        // Coversation Group
        name: 'doctor.conversation.header',
        menus: [
            {
                name: 'doctor.conversation.Conversation',
                link: '/doctor/conversation',
            },
        ],
    },
];
