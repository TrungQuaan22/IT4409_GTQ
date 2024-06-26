package com.IT4409.backend.services;

import com.IT4409.backend.Utils.Constants;
import com.IT4409.backend.dtos.ColorDTO.ColorRequestDTO;
import com.IT4409.backend.dtos.ProductDTO.ProductRequestDTO;
import com.IT4409.backend.entities.Category;
import com.IT4409.backend.entities.Color;
import com.IT4409.backend.entities.Product;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.CategoryRepository;
import com.IT4409.backend.repositories.ColorRepository;
import com.IT4409.backend.repositories.ProductRepository;
import com.IT4409.backend.repositories.SizeRepository;
import com.IT4409.backend.services.interfaces.IProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

import static com.IT4409.backend.Utils.Constants.messages;

public class ProductService implements IProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private ColorService colorService;
    @Autowired
    private SizeRepository sizeRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<Product> getAllProducts() throws Exception {
        List<Product> productList = productRepository.findAll();
        if(productList.isEmpty()) {
            throw new NotFoundException(messages.getString("product.validate.not-found"));
        }
        return productList;
    }

    @Override
    public Product getProductById(Long productId) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        return product;
    }

    @Override
    public List<Product> searchProduct(String productName) throws NotFoundException {
        List<Product> productList = productRepository.searchProduct(productName);
        if(productList.isEmpty()) {
            throw new NotFoundException(messages.getString("product.validate.not-found"));
        }
        return productList;
    }

    public Product createProduct(ProductRequestDTO productRequestDTO) throws Exception {
        Product product = modelMapper.map(productRequestDTO, Product.class);
        product.setStatus(Constants.PRODUCT_STATUS.IN_STOCK);
        List<Color> colorList = new ArrayList<>();
        Category category = categoryRepository.findById(productRequestDTO.getCategoryId())
                .orElseThrow(() -> new NotFoundException(messages.getString("category.validate.not-found")));
        product = productRepository.save(product);
        for(ColorRequestDTO colorRequestDTO : productRequestDTO.getColorRequestDTOList()){
            Color color = colorRepository.save(Color
                    .builder()
                    .colorName(colorRequestDTO.getColorName())
                    .productId(product.getProductId())
                    .colorImageList(new ArrayList<>())
                    .build());
            color = colorService.addImageToColor(product.getProductId(), color.getColorId(), colorRequestDTO.getImageList());
            colorList.add(color);
        }
        product.setThumbnail(cloudinaryService.upload(productRequestDTO.getThumbnail().getBytes(), productRequestDTO.getThumbnail().getOriginalFilename(), "thumbnails"));
        product.setSizeList(productRequestDTO.getSizeList());
        product.setColorList(colorList);
        product.setCategory(category);
        product.setRating(0.0);
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long productId, ProductRequestDTO productRequestDTO) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        if(productRequestDTO.getProductName() != null && !"".equals(productRequestDTO.getProductName())) {
            product.setProductName(productRequestDTO.getProductName());
        }
        if(productRequestDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(productRequestDTO.getCategoryId())
                    .orElseThrow(() -> new NotFoundException(messages.getString("category.validate.not-found")));
            product.setCategory(category);
        }
        if(!productRequestDTO.getSizeList().isEmpty()) {
            product.setSizeList(productRequestDTO.getSizeList());
        }
        if(productRequestDTO.getPrice() != null) {
            product.setPrice(productRequestDTO.getPrice());
        }
        if(productRequestDTO.getDiscountPrice() != null) {
            product.setDiscountPrice(productRequestDTO.getDiscountPrice());
        }
        if(productRequestDTO.getQuantityInStock() != null) {
            product.setQuantityInStock(productRequestDTO.getQuantityInStock());
        }
        if (productRequestDTO.getStatus() != null) {
            product.setStatus(productRequestDTO.getStatus());
        }
        product = productRepository.save(product);
        notificationService.sendProductOutOfStockNotification();
        return product;
    }

    @Override
    public Product deleteProduct(Long productId) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        List<Color> colorList = product.getColorList();
        for(Color color : colorList) {
            colorRepository.delete(color);
        }
        productRepository.deleteById(productId);
        return product;
    }
}
