import { Router } from "express";
import { vehicleController } from "./vehicles.controller";
import auth from "../../middleware/auth";

const router = Router()

router.post('/', auth('admin'), vehicleController.addVehicel)
router.get('/', vehicleController.getAllVehicles)
router.get('/:vehicleId', vehicleController.getSingleVehicle)
router.put('/:vehicleId', auth('admin'), vehicleController.updateVehicle)
router.delete('/:vehicleId', auth('admin'), vehicleController.deleteVehicle)

export const vehicleRoutes = router