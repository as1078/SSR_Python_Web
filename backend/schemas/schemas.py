def individual_serial(object) -> dict:
    return {
        "id": str(object["_id"]),

    }

def list_serial(objects) -> list:
    return[individual_serial(object) for object in objects]