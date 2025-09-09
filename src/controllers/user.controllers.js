import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { User } from '../models/user.model.js'
import uploadCloudinary from '../utils/cloudinary.js'
import ApiResponse from '../utils/apiResonponse.js'

const registerUser = asyncHandler(async (req, res) => {
    //get user detail from frontend
    //validation - not empty
    // check if already exist
    //check images & avatar
    //upload to cloudinary
    //create user
    //remove password , token  
    //check user creation
    //return res

    const { fullName, email, username, password } = req.body;

    // if (!fullName === "") {
    //     throw new ApiError(400,"full name is required")
    // }
    // if (!username === "") {
    //     throw new ApiError(400,"username is required")
    // }
    // if (!password === "") {
    //     throw new ApiError(400,"password is required")
    // }
    // if (!email === "") {
    //     throw new ApiError(400,"email is required")
    // }

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(404, "All fielfs are rquired")
    }

    const existedUser= await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existedUser) {
        throw new ApiError(400, "User already exist")
    };

    const avatarFile = await req.files?.avatar[0]?.path;

    const coverImageLocalPath =  req.files?.coverImage[0]?.path;

    if (!avatarFile) {
        throw new ApiError(400, 'Avatar file is required')
    };
    
    const avatarRef = await uploadCloudinary(avatarFile)
    const coverImageRef = await uploadCloudinary(coverImageLocalPath);

    if (!avatarRef) {
        throw new ApiError('Avatar is required')
    }
    const user =  await User.create({
        email,
        fullName,
        avatar:avatar.url,
        coverImageRef: coverImageRef?.url || "",
        password,
        username:username.toLowerCase()
    })
    
    const isUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!isUser) {
        throw new ApiError(500, "Something went to wrong, please do it again");
    };

    return res.status(200).json(
        new ApiResponse(200, user, "User registered succesufllu")
    )
})

export { registerUser }