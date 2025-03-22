class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    async register(req, res) {
        try {
            const user = await this.authService.register(req.body);
            res.status(201).json({ user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { token, user } = await this.authService.login(req.body);
            res.status(200).json({ token, user });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    async logout(req, res) {
        try {
            await this.authService.logout(req.user.id);
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async refreshToken(req, res) {
        try {
            const { token } = await this.authService.refreshToken(req.body);
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

export default AuthController;