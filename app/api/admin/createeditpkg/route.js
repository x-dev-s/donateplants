import Package from "@/models/packages";
import Admin from "@/models/admin";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import { SendEmailToAdmin } from "@/app/server";

export async function POST(request) {
    try {
        await connect();
        const { action, data } = await request.json();
        console.log(action, data);
        const packageExists = await Package.findOne({ name : data.name });
        if(packageExists && action === 'edit') {
            packageExists.active = data.active;
            packageExists.name = data.name;
            packageExists.type = data.type;
            packageExists.description = data.description;
            packageExists.price = data.price;
            const admin = await Admin.findOne({ id: "admin" });
            if(!admin) return NextResponse.json('Admin not found', { status: 404 });
            admin.notifications.push({
                context: 'Package',
                message: `Package ${data.name} updated`,
                date: new Date().toISOString(),
            });
            admin.unreadNotifications += 1;
            await admin.save();
            await packageExists.save();
            SendEmailToAdmin({ context: 'Package Updated', message: `${data.name} has been updated<br><h3>New Details</h3><p>Package Status: ${packageExists.active ? 'Active' : 'Inactive'}</p><p>Package Type: ${packageExists.type}</p><p>Package Description: ${packageExists.description}</p><p>Package Price: ${packageExists.price/100}` });
            return NextResponse.json('Package updated successfully', { status: 200 });
        }
        else if(packageExists && action === 'delete') {
            await Package.deleteOne({ name: data.name });
            const admin = await Admin.findOne({ id: "admin" });
            if(!admin) return NextResponse.json('Admin not found', { status: 404 });
            admin.notifications.push({
                context: 'Package',
                message: `Package ${data.name} deleted`,
                date: new Date().toISOString(),
            });
            admin.unreadNotifications += 1;
            await admin.save();
            SendEmailToAdmin({ context: 'Package Deleted', message: `${data.name} has been deleted` });
            return NextResponse.json('Package deleted successfully', { status: 200 });
        }
        else if(packageExists && action === 'create') {
            return NextResponse.json('Package already exists', { status: 400 });
        }
        else if((action === 'edit' || action === 'delete') && !packageExists) {
            return NextResponse.json('Package does not exist', { status: 400 });
        }
        const newPackage = new Package(data);
        const admin = await Admin.findOne({ id: "admin" });
        if(!admin) return NextResponse.json('Admin not found', { status: 404 });
        admin.notifications.push({
            context: 'Package',
            message: `Package ${data.name} created`,
            date: new Date().toISOString(),
        });
        admin.unreadNotifications += 1;
        await admin.save();
        await newPackage.save();
        SendEmailToAdmin({ context: 'Package Created', message: `${data.name} has been created<br><h3>Details</h3><p>Package Status: ${newPackage.active ? 'Active' : 'Inactive'}</p><p>Package Type: ${newPackage.type}</p><p>Package Description: ${newPackage.description}</p><p>Package Price: ${newPackage.price}` });
        return NextResponse.json('Package created successfully', { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.error(error, { status: 500 });
    }
}