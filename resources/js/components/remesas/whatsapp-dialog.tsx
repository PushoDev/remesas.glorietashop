import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageSquare, Copy, ExternalLink } from 'lucide-react';

interface RemesaWhatsAppDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    remesa: {
        id: number;
        nombre_beneficiario: string;
        telefono_beneficiario: string;
        direccion_beneficiario?: string | null;
        cantidad_recibir: string;
        moneda_recibe: string;
        forma_entrega: string;
        numero_tarjeta?: string | null;
        observaciones?: string | null;
        cliente: { nombre: string };
        mensajero: { nombre: string; telefono: string };
    };
}

export function RemesaWhatsAppDialog({
    open,
    onOpenChange,
    remesa,
}: RemesaWhatsAppDialogProps) {
    const formatMessage = () => {
        const lines = [
            '🚚 *Nueva Entrega - Remesa #' + remesa.id + '*',
            '',
            '📦 *Cliente:* ' + remesa.cliente.nombre,
            '',
            '👤 *Beneficiario:*',
            '• Nombre: ' + remesa.nombre_beneficiario,
            '• Teléfono: ' + remesa.telefono_beneficiario,
            '• Dirección: ' +
                (remesa.direccion_beneficiario || 'No proporcionada'),
            '',
            '💰 *Detalles de Entrega:*',
            '• Cantidad: ' +
                remesa.cantidad_recibir +
                ' ' +
                remesa.moneda_recibe,
            '• Forma: ' +
                (remesa.forma_entrega === 'efectivo'
                    ? 'Efectivo 💵'
                    : 'Transferencia 🏦'),
        ];

        if (remesa.forma_entrega === 'transferencia' && remesa.numero_tarjeta) {
            lines.push('• Tarjeta: ' + remesa.numero_tarjeta);
        }

        lines.push('');
        lines.push(
            '📝 *Observaciones:* ' +
                (remesa.observaciones || 'Sin observaciones'),
            '',
            '⏰ *Por favor confirmar al recibir.*',
        );

        return lines.join('\n');
    };

    const message = formatMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${remesa.mensajero.telefono.replace(/\D/g, '')}?text=${encodedMessage}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(message);
        } catch {
            console.error('Failed to copy');
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                        Notificar al Mensajero
                    </DialogTitle>
                    <DialogDescription>
                        Mensaje predefinido para notificar a{' '}
                        <span className="font-medium text-foreground">
                            {remesa.mensajero.nombre}
                        </span>{' '}
                        sobre la entrega #{remesa.id}
                    </DialogDescription>
                </DialogHeader>

                <div className="rounded-md border border-border bg-card p-4">
                    <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                        {message}
                    </pre>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={copyToClipboard}
                        className="gap-2"
                    >
                        <Copy className="h-4 w-4" />
                        Copiar
                    </Button>
                    <Button
                        type="button"
                        asChild
                        className="gap-2 bg-green-600 hover:bg-green-700"
                    >
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ExternalLink className="h-4 w-4" />
                            Enviar por WhatsApp
                        </a>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
