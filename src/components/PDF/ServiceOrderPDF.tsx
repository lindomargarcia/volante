import { currencyFormat } from '@/lib/utils';
import { ServiceOrder } from '@/pages/ServiceOrder/types';
import { Page, Text, View, Document, StyleSheet, Image, Svg, Line } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontSize: 9,
    padding: 12,
    fontFamily: 'Helvetica'
  },
  logo: {
    height: 40
  },
  header: {
    flexDirection: 'row',
    textAlign: 'right',
    padding: 12,
  },
  body: {
    margin: 12,
    flexGrow: 1,
    gap: 2,
    border:'1 solid #CBD5E1',
    borderRadius: 3
  },
  footer: {
    padding: 12,
    backgroundColor: '#EFEFEF',
    fontSize: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  preFooter:{
    flexDirection: 'row',
    padding: 12,
    marginBottom: 24
  },
  signContainer:{
    width: 250,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingLeft: 24
  },
  container:{
    flexDirection: 'row',
    gap: 24,
    padding: 12
  },
  title:{
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase'
  },
  title2:{
    fontFamily: 'Helvetica-Bold',
    textTransform: "capitalize",
    marginBottom: 4
  },
  subtitle:{
    textTransform: 'capitalize',
    fontSize: 10
  },
  itemText: {
    textAlign: 'right',
    width: 90
  },
  itemTitle: {
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
    width: 90
  },
  expiration:{
    fontFamily: "Helvetica-Oblique",
    fontSize: 9
  },
  pageNumber:{
    fontSize: 7,
    color: '#606060'
  }
});

interface ServiceOrderPDFProps {
    data?: ServiceOrder
}
export const ServiceOrderPDF = ({data}: ServiceOrderPDFProps) => {
    const todayDate = new Date()

    return (
    <Document>
        <Page size="A4" style={styles.page} bookmark={"Geração 2000"}>
        
        <View style={styles.header} fixed>
            <Image src={'src/assets/company_logo.png'} style={styles.logo}/>
            <View style={{flex: 1}}>
                {data?.created_at && <Text>{Intl.DateTimeFormat('pt-BR', {dateStyle: 'long'}).format(todayDate)}</Text>}
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)}/>
            </View>
        </View>

        <View style={{...styles.container, justifyContent: 'space-between'}}>
            <View>
                <Text style={styles.title}>{data?.customer.name || 'Cliente anônimo'}</Text>
                {data?.customer.cpf && <Text><Text style={styles.title2}>CPF: </Text>{data?.customer.cpf}</Text>}
                {data?.customer.email && <Text><Text style={styles.title2}>E-mail: </Text>{data?.customer.email}</Text>}
                {data?.customer.phone && <Text><Text style={styles.title2}>Telefone: </Text>{data?.customer.phone}</Text>}
            </View>
            <View>
                {data?.vehicle.brand && <Text style={styles.title}>{`${data?.vehicle.brand} ${data?.vehicle.model}`}</Text>}
                {data?.vehicle.plate && <Text><Text style={styles.title2}>Placa: </Text>{data?.vehicle.plate}</Text>}
                {data?.vehicle.color && <Text><Text style={styles.title2}>Cor: </Text>{data?.vehicle.color}</Text>}
                {data?.vehicle.year && <Text><Text style={styles.title2}>Ano: </Text>{data?.vehicle.year}</Text>}
            </View>
            <View style={{width: 130}}>
                <Text style={styles.title}>Endereço</Text>
                <Text>Endereço não informado</Text>
            </View>
        </View>
        <Text style={{...styles.title, fontSize: 12, textAlign: 'center', marginVertical: 8}}>Orçamento Veicular</Text>
        <View style={styles.body}>
            <View style={{flexDirection: 'row', minHeight: 12, backgroundColor: '#EFEFEF',paddingHorizontal: 12, paddingVertical: 4, marginBottom: 8}}>
                <Text style={{...styles.itemTitle,textAlign: 'left', flex: 1}}>Item</Text>
                <Text style={styles.itemTitle}>Qtd.</Text>
                <Text style={styles.itemTitle}>Valor</Text>
                <Text style={styles.itemTitle}>Subtotal</Text>
                <Text style={styles.itemTitle}>Total</Text>
            </View>
            {data?.items.map(item => (
                <View style={{flexDirection: 'row', minHeight: 12, paddingHorizontal: 12}}>
                    <Text style={{...styles.itemText, flex: 1, textAlign: 'left'}}>{item.description}</Text>
                    <Text style={styles.itemText}>{item.quantity}</Text>
                    <Text  style={styles.itemText}>{currencyFormat(item.value, 'currency')}</Text>
                    <Text style={styles.itemText}>{currencyFormat(item.value * item.quantity, 'currency')}</Text>
                    <Text style={styles.itemText}>{currencyFormat((item.value * item.quantity) - item.discount, 'currency')}</Text>
                </View>
            ))}
        </View>

        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Peças</Text>
                <Text>R$ 0,00</Text>
            </View>
            <View>
                <Text style={styles.title}>Serviços</Text>
                <Text>R$ 0,00</Text>
            </View>
            <View>
                <Text style={styles.title}>Descontos</Text>
                <Text>R$ 0,00</Text>
            </View>
            <View style={{flex: 1, textAlign: 'right'}}>
                <Text style={styles.title}>Valor Total</Text>
                <Text>R$ 0,00</Text>
            </View>
        </View>

        <View style={{padding: 12}}>
            <Text style={styles.expiration}>Orçamento válido até {Intl.DateTimeFormat('pt-BR').format(todayDate.getDate() + 15)}</Text>
            <Svg height="5" width="100%">
                <Line x1="0" y1="5" x2="2000" y2="5" strokeWidth={2} stroke="#CBD5E1" />
            </Svg>
        </View>

        <View style={styles.preFooter}>
            <View style={{flex: 1, gap: 12}}>
                <View>
                    <Text style={styles.title}>Formas de pagamento</Text>
                    <Text>50% de entrada da mão de obra e o restante parcelado em até 3 vezes no cartão, sem juros, para orçamentos acima de R$ 500,00.
                        Pagamento à vista com 5% de desconto para orçamentos acima de R$ 1.000,00.
                        Aceitamos Pix pelo CNPJ 04.367.737.0001-06.</Text>
                </View>
                <View>
                    <Text style={styles.title}>Avisos</Text>
                    <Text>Em alguns casos, precisaremos ajustar a data de entrega. Isso pode acontecer por diverso fatores, como atrasos na entrega de peças.</Text>
                </View>
            </View>
            <View style={styles.signContainer}>
                <Text>______________________</Text>
                <Text style={{marginTop: 6, fontFamily: 'Helvetica-Bold', marginBottom: 24}}>assinatura da oficina</Text>
                <Text>______________________</Text>
                <Text style={{marginTop: 6, fontFamily: 'Helvetica-Bold'}}>assinatura do cliente</Text>
            </View>
        </View>
        <View style={styles.footer} fixed>
            <View>
                <Text><Text style={styles.title2}>e-mail: </Text>funilariageracao2000@gmail.com </Text>
                <Text><Text style={styles.title2}>instagram: </Text>@funilariageracao2k</Text>
                <Text><Text style={styles.title2}>facebook: </Text>funilariageracao2000</Text>
                <Text><Text style={styles.title2}>Telefone: </Text>{`+55 (11) 4194-3489`}</Text>
            </View>
            <Text style={{width: 110,textAlign: 'right'}}>Rua Gisele, 204, Parque dos Camargos, 06436-120 Barueri - SP</Text>
        </View>
        </Page>
    </Document>
)};