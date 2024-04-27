import User from '../model/User.js'
import bcrypt from 'bcrypt'

const handleRegister = async (req, res) => {
    const { username, name, email, password, interests } = req.body
    console.log('Registering user:', username, name, email, interests);

    try {
        if (!username || !password)
            return res.status(400).send({ message: 'Enter Username and Password!' })

        const existingUser = await User.findOne({ username })

        if (existingUser) return res.send({ message: 'User already exists' })

        const hashedPwd = await bcrypt.hash(password, 10)

        const newUser = new User({
            username: username,
            name: name,
            email: email,
            password: hashedPwd,
            interests: interests
        })

        await newUser.save()

        res.send({ message: 'User registered successfully' })
    } catch (err) {
        console.error('Error registering user:', err)
        res.status(500).send({ message: 'Invalid Password' })
    }
}

export default handleRegister