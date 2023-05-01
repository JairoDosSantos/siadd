import {
    Document, Image, Page, PDFDownloadLink, StyleSheet, Text,
    View
} from "@react-pdf/renderer";
import moment from 'moment';
import { FaPrint } from "react-icons/fa";
import { generalType, IDocente } from "../../pages/admin/eleger_membros_cad";
// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffff",
        color: "black",
        padding: 30
    },

    section: {
        paddingHorizontal: 2,

        width: '30%',
        fontSize: '8px',
        textAlign: 'center'
    },
    total: {
        color: '#cd1212'
    },
    cabecalhoPrincipal: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10px',
        padding: 5,
        fontWeight: 'light',
    },
    cabecalho: {
        backgroundColor: '#D3D3D3',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderBottomWidth: '0.5px',
        borderTopWidth: '0.5px',
        textAlign: 'center',
        marginBottom: 5,
        fontWeight: 'extrabold',
        fontSize: '10px'
    },
    textoCabecalho: {
        display: 'flex',
        flexDirection: 'column',
    }, corpoHeader: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10px',
        padding: 5,
        fontWeight: 'light',

    },
    corpo: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10px',
        padding: 5,
        fontWeight: 'light',
        borderWidth: '1px',
        borderRadius: '5px'
    },
    titulo: {
        fontWeight: 'ultrabold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        paddingTop: 15,
        paddingBottom: 4,
        fontSize: '12px',
        borderTop: '0.5px',
        textAlign: 'center'
    },
    logo: {
        width: 175,
        height: 60,
    },
    divisaoAssinatura: {
        marginTop: 75,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },

    assinaturas: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '10px',
        paddingHorizontal: '10px',


    },
    assinaturas1: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '10px',

    },
    assinaturaIndividual1: {
        width: '50%',
        borderBottom: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingBottom: 20,
        marginBottom: 15

    },
    assinaturaIndividual: {
        paddingVertical: 30,
        paddingHorizontal: 25,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: 1,
        textAlign: 'center',

    },
    textoTitulo: {
        fontWeight: 'bold'
    },
    fotoTitulo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '8px'
    },
    rodape: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '8px',
        paddingTop: '35px'
    },
    numPagina: {
        position: 'absolute',
        bottom: '30px',
        right: '40px',
        fontSize: '8px',
    }

});

type RelatorioMembrosCADProps = {
    membrosCAD: DocentesCADType
}

type DocentesCADType = {
    cad: CadType
    Docentes: IDocente[]
}
type CadType = {
    descricao: string;
    estado_cad: generalType;
    ativo: number
}

// Create Document Component

export function MembrosCADRelatorio({ membrosCAD }: RelatorioMembrosCADProps) {
    const data = moment().format("DD/MM/yyyy")
    const ano = (new Date()).getFullYear()
    return (


        <Document title="Docentes membros do CAD">
            {/*render a single page*/}

            {/**   <a href="https://ibb.co/dcFSMGS"><img src="https://i.ibb.co/KGdYhFY/logo-INSTIC-1.jpg" alt="logo-INSTIC-1" border="0"></a> */}
            <Page size="A4" style={styles.page} >

                <View style={styles.fotoTitulo}>
                    <View style={styles.textoCabecalho}>
                        <View style={{ marginBottom: 10 }}>
                            <Image style={styles.logo} src="https://i.ibb.co/KGdYhFY/logo-INSTIC-1.jpg" />
                        </View>
                        <Text style={{ marginBottom: 4 }}>NIF:5000662020</Text>
                        <Text style={{ marginBottom: 4 }}>TEL.: 222041728</Text>
                        <Text style={{ marginBottom: 4 }}>ENDEREÇO: Bairro dos CTT´s km 7, Rangel - Luanda.</Text>
                    </View>

                    <View>
                        <Text>SIADD  - INSTIC</Text>

                    </View>
                </View>

                <View style={styles.titulo}>
                    <Text>DOCENTES PERTENCENTES A CAD  {`${membrosCAD?.cad?.descricao} - ${membrosCAD?.cad?.ativo === 1 ? "Activo" : "Inactivo"}`}</Text>
                </View>
                <View style={{ border: 1, padding: 4, marginBottom: 10 }}>
                    <View style={styles.cabecalhoPrincipal}>

                        <View style={styles.section}>
                            <Text style={styles.textoTitulo}>CAD</Text>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.textoTitulo}>Constituído por</Text>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.textoTitulo}>Unidade Orgânica</Text>
                        </View>
                        <View style={styles.section}>
                            <Text>Endereço Casa</Text>
                        </View>
                        <View style={styles.section}>
                            <Text>Data Emissão</Text>
                        </View>
                    </View>

                    <View style={styles.corpoHeader}>

                        <View style={styles.section}>
                            <Text>{membrosCAD?.cad.descricao}</Text>
                        </View>
                        <View style={styles.section}>
                            <Text>{`${membrosCAD?.Docentes.length} docentes`}</Text>
                        </View>
                        <View style={styles.section}>
                            <Text>INSTIC</Text>
                        </View>
                        <View style={styles.section}>
                            <Text>Rua dos CTT´s, Rangel.</Text>
                        </View>
                        <View style={styles.section}>
                            <Text> {data}</Text>
                        </View>

                    </View>
                </View>


                <View style={styles.cabecalho}>

                    <View style={styles.section}>
                        <Text style={styles.textoTitulo}>Docente</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.textoTitulo}>Grau Acadêmico</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.textoTitulo}>Categoria Profissional</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>Cargo</Text>
                    </View>


                </View>
                {
                    membrosCAD?.Docentes.map((docente, index) => (
                        <View style={styles.corpo} key={index} wrap={false}>

                            <View style={styles.section}>
                                <Text>{docente?.nome_docente}</Text>
                            </View>
                            <View style={styles.section}>
                                <Text>{docente?.grau_academico?.descricao}</Text>
                            </View>
                            <View style={styles.section}>
                                <Text>{docente?.categoria.descricao}</Text>
                            </View>
                            <View style={styles.section}>
                                <Text>{docente?.cargo?.descricao}</Text>
                            </View>

                        </View>
                    ))
                }

                <View style={styles.divisaoAssinatura}>
                    <View style={styles.assinaturas1}>
                        <Text style={styles.assinaturaIndividual1}>O Director</Text>
                    </View>
                </View>

                <Text
                    style={styles.numPagina}
                    render={({ pageNumber, totalPages }) => (`Página ${pageNumber} de ${totalPages}`)}
                    fixed />
            </Page>
        </Document>


    );
}

const LinkDonwloadGT = ({ membrosCAD }: RelatorioMembrosCADProps) => (
    <PDFDownloadLink
        className='bg-azul text-white px-4 py-2 rounded font-bold flex items-center gap-2 hover:brightness-75'
        document={<MembrosCADRelatorio membrosCAD={membrosCAD} />}
    >

        {({ blob, url, loading, error }) =>
            loading ?
                <>

                    <span>loading...</span>
                </>
                : <>
                    <FaPrint />
                    <span>Imprimir Lista</span>
                </>
        }

    </PDFDownloadLink >)

export default LinkDonwloadGT;