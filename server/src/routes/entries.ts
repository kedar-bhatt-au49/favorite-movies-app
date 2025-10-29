import express, { Response } from 'express';
import { prisma } from '../lib/prisma';
import { entrySchema, updateEntrySchema, querySchema } from '../validation/schemas';
import { uploadMiddleware } from '../middleware/upload';
import { optionalAuth, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Apply optional auth to all routes
router.use(optionalAuth);

// GET /api/entries - Get all entries with pagination and filtering
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, search, type } = querySchema.parse(req.query);
    const skip = (page - 1) * limit;

    // Build where clause for filtering
    const where: any = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { director: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (type) {
      where.type = type;
    }

    const [entries, total] = await Promise.all([
      prisma.entry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, name: true, email: true }
          }
        }
      }),
      prisma.entry.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    res.json({
      success: true,
      data: {
        entries,
        pagination: {
          currentPage: page,
          totalPages,
          totalEntries: total,
          hasMore,
          limit
        }
      }
    });
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch entries'
    });
  }
});

// GET /api/entries/:id - Get single entry
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const entry = await prisma.entry.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Entry not found'
      });
    }

    res.json({
      success: true,
      data: entry
    });
  } catch (error: any) {
    console.error('Error fetching entry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch entry'
    });
  }
});

// POST /api/entries - Create new entry
router.post('/', uploadMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const validatedData = entrySchema.parse(req.body);
    
    // If file was uploaded, use the uploaded file path
    let posterUrl = validatedData.posterUrl;
    if (req.file) {
      posterUrl = `/uploads/${req.file.filename}`;
    }

    const entry = await prisma.entry.create({
      data: {
        ...validatedData,
        posterUrl,
        // Associate with user if authenticated (for bonus auth feature)
        userId: req.user?.id || null
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: entry,
      message: 'Entry created successfully'
    });
  } catch (error: any) {
    console.error('Error creating entry:', error);
    if (error?.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error?.errors
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create entry'
    });
  }
});

// PUT /api/entries/:id - Update entry
router.put('/:id', uploadMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = updateEntrySchema.parse(req.body);

    // Check if entry exists
    const existingEntry = await prisma.entry.findUnique({
      where: { id }
    });

    if (!existingEntry) {
      return res.status(404).json({
        success: false,
        message: 'Entry not found'
      });
    }

    // If file was uploaded, use the uploaded file path
    let posterUrl = validatedData.posterUrl;
    if (req.file) {
      posterUrl = `/uploads/${req.file.filename}`;
    }

    const updatedEntry = await prisma.entry.update({
      where: { id },
      data: {
        ...validatedData,
        ...(posterUrl !== undefined && { posterUrl })
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.json({
      success: true,
      data: updatedEntry,
      message: 'Entry updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating entry:', error);
    if (error?.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error?.errors
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update entry'
    });
  }
});

// DELETE /api/entries/:id - Delete entry
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Check if entry exists
    const existingEntry = await prisma.entry.findUnique({
      where: { id }
    });

    if (!existingEntry) {
      return res.status(404).json({
        success: false,
        message: 'Entry not found'
      });
    }

    await prisma.entry.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Entry deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting entry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete entry'
    });
  }
});

export default router;
