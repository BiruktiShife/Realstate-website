import { NextRequest, NextResponse } from 'next/server';
import { uploadImageToPinata, uploadMultipleImagesToPinata } from '@/lib/pinata';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const propertyId = formData.get('propertyId') as string;
    const companyId = formData.get('companyId') as string;
    const description = formData.get('description') as string;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    // Validate file types
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.' },
        { status: 400 }
      );
    }

    // Validate file sizes (max 10MB per file)
    const maxSize = 10 * 1024 * 1024; // 10MB
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 10MB per file.' },
        { status: 400 }
      );
    }

    let results;

    if (files.length === 1) {
      // Single file upload
      const file = files[0];
      const result = await uploadImageToPinata(file, {
        name: file.name,
        description: description || '',
        propertyId,
        companyId,
      });

      if (!result.success) {
        return NextResponse.json(
          { error: result.error || 'Upload failed' },
          { status: 500 }
        );
      }

      results = [result];
    } else {
      // Multiple files upload
      results = await uploadMultipleImagesToPinata(files, {
        propertyId,
        companyId,
      });

      const failedUploads = results.filter(result => !result.success);
      if (failedUploads.length > 0) {
        return NextResponse.json(
          { 
            error: 'Some uploads failed',
            results,
            failedCount: failedUploads.length,
          },
          { status: 207 } // Multi-status
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${results.length} file(s)`,
      results,
    });

  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle file deletion
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hash = searchParams.get('hash');

    if (!hash) {
      return NextResponse.json(
        { error: 'IPFS hash is required' },
        { status: 400 }
      );
    }

    const { deleteImageFromPinata } = await import('@/lib/pinata');
    const result = await deleteImageFromPinata(hash);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Deletion failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully',
    });

  } catch (error) {
    console.error('Delete API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
