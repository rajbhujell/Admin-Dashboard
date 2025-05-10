// app/api/products/route.js
import clientPromise from "../../../lib/monogdb";

export async function GET(request) {
  const client = await clientPromise;
  const db = client.db();
  const products = await db.collection("products").find({}).toArray();
  return new Response(JSON.stringify(products), { status: 200 });
}

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db();
  const newProduct = await request.json();
  await db.collection("products").insertOne(newProduct);
  return new Response(JSON.stringify({ message: "Product added" }), {
    status: 201,
  });
}
