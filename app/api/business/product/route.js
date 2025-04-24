import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/prisma/client";
import { auth } from "@/lib/auth";
import { PRODUCT_MUTATIONS } from "@/lib/db/actions";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    if (session.user.role !== "BUSINESS")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    // 2) parse fields + file
    const form = await request.formData();
    const name = form.get("name");
    const description = form.get("description");
    const price = form.get("price");
    const category = form.get("category");
    const url = form.get("url");
    const image = form.get("image");

    // 3) basic validation
    if (!name || typeof name !== "string")
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    if (!description || typeof description !== "string")
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    if (!price || isNaN(Number(price)))
      return NextResponse.json(
        { error: "Valid price is required" },
        { status: 400 }
      );
    if (!category || typeof category !== "string")
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );

    // 4) upload to Vercel Blob
    const pathname = `products/${session.user.businessId}/${Date.now()}-${
      image.name || "upload"
    }`;

    let mainImage = null;
    if (image) {
      const { url } = await put(pathname, image, {
        access: "public",
        contentType: image.type,
        orgId: process.env.VERCEL_ORG_ID,
        projectId: process.env.VERCEL_PROJECT_ID,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      mainImage = url;
    }

    // 5) create in Prisma
    const product = await prisma.product.create({
      data: {
        name: form.get("name"),
        description: form.get("description"),
        price: Number(price),
        category,
        url: url || null,
        mainImage,
        seller: { connect: { id: session.user.businessId } },
      },
    });

    return NextResponse.json(
      { product, message: "Product created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  try {
    const form = await request.formData();
    const productId = form.get("id");
    const name = form.get("name");
    const description = form.get("description");
    const price = form.get("price");
    const category = form.get("category");
    const url = form.get("url");
    const image = form.get("image");
    const status = form.get("status");

    if (!name || typeof name !== "string")
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    if (!description || typeof description !== "string")
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    if (!price || isNaN(Number(price)))
      return NextResponse.json(
        { error: "Valid price is required" },
        { status: 400 }
      );
    if (!category || typeof category !== "string")
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );

    // 4) change image in Vercel Blob if new image is provided
    let imageUrl = null;
    if (image) {
      const { url } = await put(
        `products/${session.user.businessId}/${Date.now()}-${image.name || "upload"}`,
        image,
        {
          access: "public",
          contentType: image.type,
          orgId: process.env.VERCEL_ORG_ID,
          projectId: process.env.VERCEL_PROJECT_ID,
          token: process.env.BLOB_READ_WRITE_TOKEN,
        }
      );
      imageUrl = url;
    }
    const updated = await PRODUCT_MUTATIONS.updateProduct(productId, {
      name: name,
      description: description,
      price: Number(price),
      category,
      url: url || null,
      mainImage: imageUrl,
      status: status.toUpperCase(),
    });
    console.log("Updated product", updated);
    return NextResponse.json(
      { message: "Product updated successfully", updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  try {
    const { id: productId } = await request.json();
    if (!productId)
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    const deleted = await PRODUCT_MUTATIONS.deleteProduct(productId);
    console.log("Deleted product:", deleted);
    return NextResponse.json(
      { message: "Product deleted successfully", deleted },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
