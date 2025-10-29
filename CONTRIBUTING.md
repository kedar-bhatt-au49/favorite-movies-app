# Contributing to Favorite Movies App

Thank you for your interest in contributing to the Favorite Movies App! We welcome contributions from the community.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- MySQL database (for local development)

### Local Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/kedar-bhatt-au49/favorite-movies-app.git
   cd favorite-movies-app
   ```

2. **Install dependencies**
   ```bash
   npm run setup
   ```

3. **Set up environment files**
   ```bash
   # Copy example files
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   
   # Edit with your local database credentials
   ```

4. **Set up database**
   ```bash
   cd server
   npm run db:push
   npm run db:seed
   cd ..
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

## 🔧 Development Workflow

### Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Adding tests

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(auth): add user registration
fix(api): resolve database connection issue
docs(readme): update deployment instructions
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Pull Request Process

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes**
   ```bash
   # Test both frontend and backend
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to GitHub and create a PR
   - Use the PR template
   - Link any related issues
   - Request review

## 📋 Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Testing
- [ ] Frontend builds successfully
- [ ] Backend builds successfully
- [ ] Tested locally
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots of UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🎨 Code Style Guidelines

### TypeScript/JavaScript

- Use TypeScript for type safety
- Follow existing ESLint configuration
- Use meaningful variable names
- Write self-documenting code
- Prefer `const` over `let`
- Use async/await over Promises

```typescript
// ✅ Good
const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

// ❌ Avoid
function getUser(id) {
  return prisma.user.findUnique({ where: { id } });
}
```

### React Components

- Use functional components with hooks
- Follow component naming convention (PascalCase)
- Keep components small and focused
- Use TypeScript interfaces for props

```tsx
// ✅ Good
interface MovieCardProps {
  movie: Movie;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="movie-card">
      {/* Component content */}
    </div>
  );
};
```

### CSS/Styling

- Use TailwindCSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use semantic class names when needed

```tsx
// ✅ Good
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
  <p className="text-gray-600 text-sm">{description}</p>
</div>
```

## 🗂️ Project Structure

```
favorite-movies-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service functions
│   │   ├── lib/            # Utility functions
│   │   ├── types/          # TypeScript type definitions
│   │   └── config/         # Configuration constants
│   └── public/             # Static assets
└── server/                 # Node.js backend
    ├── src/
    │   ├── routes/         # Express route handlers
    │   ├── middleware/     # Custom middleware
    │   ├── validation/     # Zod validation schemas
    │   ├── lib/            # Database and utility functions
    │   └── types/          # TypeScript type definitions
    ├── prisma/             # Database schema and migrations
    └── uploads/            # Uploaded files storage
```

## 🧪 Testing Guidelines

### Frontend Testing

```typescript
// Example test structure
describe('MovieCard Component', () => {
  it('should render movie title', () => {
    // Test implementation
  });
  
  it('should call onEdit when edit button is clicked', () => {
    // Test implementation
  });
});
```

### Backend Testing

```typescript
// Example API test
describe('GET /api/entries', () => {
  it('should return list of entries', async () => {
    // Test implementation
  });
  
  it('should handle pagination correctly', async () => {
    // Test implementation
  });
});
```

## 🐛 Bug Reports

When reporting bugs, include:

1. **Bug Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, browser, Node.js version
6. **Screenshots**: If applicable

Use the bug report template:

```markdown
**Bug Description**
A clear and concise description of the bug.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. Windows, macOS, Linux]
 - Browser [e.g. chrome, safari]
 - Node.js version [e.g. 18.0.0]

**Additional context**
Add any other context about the problem here.
```

## 💡 Feature Requests

For feature requests, include:

1. **Feature Description**: Clear description
2. **Use Case**: Why is this feature needed?
3. **Proposed Solution**: How should it work?
4. **Alternatives**: Any alternative solutions considered?

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for complex functions
- Document API endpoints with examples
- Update README for new features
- Include code examples in documentation

```typescript
/**
 * Validates and creates a new movie entry
 * @param entryData - The movie data to create
 * @param userId - ID of the user creating the entry
 * @returns Promise resolving to the created entry
 * @throws ValidationError if data is invalid
 */
export const createEntry = async (
  entryData: CreateEntryData,
  userId: string
): Promise<Entry> => {
  // Implementation
};
```

### API Documentation

Document API endpoints with:
- Request/response examples
- Parameter descriptions
- Error responses
- Authentication requirements

## 🎖️ Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

## 📞 Getting Help

- 💬 **Discussions**: Use GitHub Discussions for questions
- 🐛 **Issues**: Create issues for bugs and feature requests
- 📧 **Email**: Contact maintainers for sensitive issues

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards

Examples of behavior that contributes to a positive environment:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

Examples of unacceptable behavior:
- Trolling, insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Project maintainers are responsible for clarifying standards and will take appropriate action in response to unacceptable behavior.

## 🙏 Thank You

Thank you for contributing to make this project better! Every contribution, no matter how small, is valuable and appreciated.

---

For more information, see:
- [README.md](README.md) - Project overview
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [Issues](https://github.com/kedar-bhatt-au49/favorite-movies-app/issues) - Bug reports and feature requests
