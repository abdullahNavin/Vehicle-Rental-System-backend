import { Request, Response } from "express";
import { vehicleService } from "./vehicles.service";

const addVehicel = async (req: Request, res: Response) => {
    const payload = req.body;
    try {
        const result = await vehicleService.addVehicel(payload);
        // console.log(result);
        if (result.rowCount === 0) {
            res.status(500).json(
                {
                    success: false,
                    message: "failed to add vehicle",
                }
            )
            return;
        }
        res.status(201).json(
            {
                success: true,
                message: "Vehicle created successfully",
                data: result.rows[0]
            }
        )

    }
    catch (err: any) {
        res.status(500).json(
            {
                success: false,
                message: "failed to add vehicle",
                errors: err.message
            }
        )
    }
}

// get all vehicles
const getAllVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleService.getAllVehicles();
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows

        })
    }
    catch (err: any) {
        res.status(500).json(
            {
                success: false,
                message: "failed to retrieved vehicles",
                errors: err.message
            }
        )
    }
}

// get single vehicle
const getSingleVehicle = async (req: Request, res: Response) => {
    const id = req.params.vehicleId
    console.log(id);
    try {
        const result = await vehicleService.getSingleVehicle(id as string)
        // console.log(result.rows);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle retrieved successfully",
                data: result.rows[0]

            })
        }

    }
    catch (err: any) {
        res.status(500).json(
            {
                success: false,
                message: "failed to retrieved vehicle",
                errors: err.message
            }
        )
    }
}

// update vehicle
const updateVehicle = async (req: Request, res: Response) => {
    const id = req.params.vehicleId;
    const payload = req.body
    try {
        const result = await vehicleService.updateVehicle(payload, id as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle update failed"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
                data: result.rows[0]
            })
        }
    }
    catch (err: any) {
        res.status(500).json(
            {
                success: false,
                message: "failed to update vehicle",
                errors: err.message
            }
        )
    }

}

// delete vehicle
const deleteVehicle = async (req: Request, res: Response) => {
    const id = req.params.vehicleId;
    try {
        const result = await vehicleService.deleteVehicle(id as string)
        // console.log(result);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: 'failed to delete'
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully"
            })
        }
    }
    catch (err: any) {
        res.status(500).json(
            {
                success: false,
                message: "failed to delete the vehicle",
                errors: err.message
            }
        )
    }

}

export const vehicleController = {
    addVehicel,
    getAllVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
}