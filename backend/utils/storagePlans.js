export const storagePlans = {
    'Free': {
        id: 1,
        name: "Free",
        price: 0,
        description: "Includes 5 GB of storage, 25 MB per-file upload limit, and basic folder organization. Ideal for personal use and testing.",
        storage: 5
    },
    'Pro': {
        id: 2,
        name: "Pro",
        price: 9.99,
        description: "Includes 100 GB of storage, 500 MB per-file upload limit, file versioning, and priority upload speed. Great for freelancers.",
        storage: 10
    },
    'Team': {
        id: 3,
        name: "Team",
        price: 19.99,
        description: "Includes 1 TB shared storage, 1 GB per-file upload limit, team collaboration tools, admin controls, and audit logs.",
        storage: 50
    },
    'Enterprise': {
        id: 4,
        name: "Enterprise",
        price: 49.99,
        description: "Custom storage limits, unlimited upload size, advanced security features, analytics, and dedicated support. Tailored for large organizations.",
        storagePlans: 100
    }
};