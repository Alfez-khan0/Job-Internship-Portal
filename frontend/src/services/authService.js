// import api from "./api";

// export const registerUser = async (userData) => {
//     const response = await api.post("/auth/register", userData);
//     return response.data;
// };


// export const verifyUserOTP = async ({ userId, otp }) => {
//     const response = await api.post("/auth/verify-otp", {
//         userId,
//         otp: String(otp).trim(),
//     });

//     return response.data;
// };



import api from "./api";

export const registerUser = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};

export const verifyUserOTP = async ({ userId, otp }) => {
    const response = await api.post("/auth/verify-otp", {
        userId,
        otp: String(otp).trim(),
    });

    return response.data;
};

export const loginUser = async (userData) => {
    const response = await api.post("/auth/login", userData);
    return response.data;
};
