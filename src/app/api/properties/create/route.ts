import { BOT_USER } from "@/constants/bot";
import Property from "@/models/property.model";
import User from "@/models/user.model";
import connectMongo from "@/utils/connect-mongo";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const { name, email } = await req.json();

    let bot: any;

    const isBotExist = await User.findOne({
      email: BOT_USER.email,
    });

    bot = isBotExist;

    if (!isBotExist) {
      const hashedPassword = await bcrypt.hash(BOT_USER.password, 10);
      const botUser = new User({
        name: BOT_USER.name,
        email: BOT_USER.email,
        password: hashedPassword,
      });

      bot = await botUser.save();
    }

    const property = new Property({
      name,
      email,
    });

    const savedProperty = await property.save();

    bot.properties.push({
      role: "BOT",
      property: savedProperty._id,
    });

    await bot.save();

    return NextResponse.json(
      {
        message: "Property Created",
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: error?.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
