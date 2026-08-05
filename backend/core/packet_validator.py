class PacketValidator:

    @staticmethod
    def validate(packet):

        if packet is None:

            return False

        if not hasattr(packet, "frame"):

            return False

        return True