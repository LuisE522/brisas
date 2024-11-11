import { NextRequest, NextResponse } from "next/server";
import path, { join } from "path";
import fs from "fs/promises";
import mime from "mime";

import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    const image = (formData.get("image") as File) || null;
    const ruta = (formData.get("ruta") as string) || null;
    const onUpdate = (formData.get("update") as string) || null;

    if (onUpdate != null) {
      if (onUpdate.includes("github") == false) {
        //const fileToDelete = join("var", "www", "brisas", onUpdate);
        const fileToDelete = join(process.cwd(), "public", onUpdate);
        try {
          await fs.unlink(fileToDelete); // Eliminar el archivo
        } catch (deleteError) {
          console.error("Error deleting file:", deleteError);
          return NextResponse.json(
            { error: "Error deleting the existing file." },
            { status: 500 }
          );
        }
      }
    }

    if (!image) {
      return NextResponse.json(
        { error: "No image file provided." },
        { status: 400 }
      );
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const relativeUploadDir = `/uploads${ruta ? ruta : ""}`;

    //const uploadDir = join("var", "www", "brisas", "public", relativeUploadDir);
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    await fs.mkdir(uploadDir, { recursive: true });

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uuidv4()}.${mime.getExtension(image.type)}`;
    const filePath = join(uploadDir, filename);

    await fs.writeFile(filePath, buffer as unknown as string);

    const fileUrl = `${relativeUploadDir}/${filename}`;

    return NextResponse.json({ fileUrl });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
};
